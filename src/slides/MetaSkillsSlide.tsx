import { useState, useEffect, ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import { exportRegistry } from '../components/exportRegistry';
import skillMdFallback from '../assets/skill-creator-skill.md?raw';

const SKILL_MD_URL =
  'https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/skill-creator/skills/skill-creator/SKILL.md';

// Two consecutive bullet sets revealed one-by-one, mirroring SkillMarketplaceSlide.
// Set 1 = the meta-skill thesis + how to author one (full-width, no panel).
// Set 2 = the prebuilt-vs-custom counterpoint + the live SKILL.md panel.
const FIRST_SET: ReactNode[] = [
  <>найважливіший скіл у вашому маркетплейсі - це <Emphasis color="orange">скіл, що створює скіли</Emphasis></>,
  <>від його якості залежить якість <Emphasis color="orange">усіх</Emphasis> скілів у вашому маркетплейсі</>,
  <>змусьте клод прочитати <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices</SlideLink> як відправну точку</>,
];

const SECOND_SET: ReactNode[] = [
  <>або просто візьміть <Emphasis color="green">готовий</Emphasis> skill-creator від Anthropic: <SlideLink href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator">https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator</SlideLink></>,
  <>ваша наступна проблема - баланс між <Emphasis color="green">готовими</Emphasis> скілом на який не треба витрачати час і зусилля та <Emphasis color="orange">кастомними</Emphasis> скілом який може врахувати всю вашу in-house специфіку</>,
];

function MetaSkillsContent({ revealStage, slideId }: { revealStage: number; slideId: string }) {
  // Start with the bundled snapshot so the panel renders immediately even on
  // a flaky connection; swap to the live SKILL.md once the fetch resolves.
  const [content, setContent] = useState<string>(skillMdFallback);

  useEffect(() => {
    fetch(SKILL_MD_URL)
      .then(r => {
        if (!r.ok) throw new Error('fetch failed');
        return r.text();
      })
      .then(text => {
        setContent(text);
        exportRegistry.markSlideSettled(slideId);
      })
      .catch((err: Error) => {
        // Keep the fallback content visible; just settle so the exporter moves on.
        exportRegistry.markSlideSettled(slideId);
        if (typeof console !== 'undefined') console.warn('MetaSkills fetch failed:', err.message);
      });
  }, [slideId]);

  const setIndex = revealStage < FIRST_SET.length ? 0 : 1;
  const currentSet = setIndex === 0 ? FIRST_SET : SECOND_SET;
  const visibleCount =
    setIndex === 0 ? revealStage + 1 : revealStage - FIRST_SET.length + 1;

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">мета</span>{' '}
        <span className="text-orange">скіл</span>
      </h2>

      <div
        key={setIndex}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: setIndex === 0 ? 0 : '40px',
          minHeight: 0,
        }}
      >
        {/* Bullets — full-width on the meta-skill thesis (set 0), wider
            column on the prebuilt/custom side (set 1) so the lines breathe
            even alongside the SKILL.md panel. */}
        <div
          className="meta-skills-bullets"
          style={
            setIndex === 0
              ? { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }
              : ({
                  flex: '0 0 46%',
                  justifyContent: 'center',
                  gap: '14px',
                  ['--slide-line-height-normal' as string]: '1.35',
                } as React.CSSProperties)
          }
        >
          {currentSet.slice(0, visibleCount).map((bullet, i) => (
            <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
          ))}
        </div>

        {/* SKILL.md panel — only on the second set, paired with the
            "готовий skill-creator" prompt. */}
        {setIndex === 1 && (
          <div className="meta-skills-panel">
            <div className="meta-skills-panel__chrome meta-skills-panel__chrome--top">
              ░░░ SKILL.md — skill-creator ░░░
            </div>

            <div className="meta-skills-panel__viewport">
              <div className="meta-skills-panel__scroll">
                {content}
                <div className="meta-skills-panel__scroll-divider">{content}</div>
              </div>
            </div>

            <div className="meta-skills-panel__chrome meta-skills-panel__chrome--bottom">
              [END OF TRANSMISSION]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const MetaSkillsSlide: SlideDefinition = {
  id: 'meta-skills',
  // 5 reveal stages: 0..2 walk through FIRST_SET (full-width thesis),
  // 3..4 walk through SECOND_SET alongside the SKILL.md panel.
  maxRevealStages: FIRST_SET.length + SECOND_SET.length - 1,
  asyncSettle: true,
  content: ({ revealStage, slideId }: SlideContentProps) => <MetaSkillsContent revealStage={revealStage} slideId={slideId} />,
  notes:
    'Мета-скіли — найвища точка важеля. Stage 0–2 (full-width): чому скіл-що-створює-скіли є найважливішим, як його будувати з best practices. Stage 3–4 (з SKILL.md панеллю): або візьміть готовий skill-creator від Anthropic; далі — баланс між готовими та кастомними скілами.',
};
