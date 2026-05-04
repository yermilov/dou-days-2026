import { useState, useEffect } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import { exportRegistry } from '../components/exportRegistry';

const SKILL_MD_URL =
  'https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/skill-creator/skills/skill-creator/SKILL.md';

function MetaSkillsContent({ revealStage, slideId }: { revealStage: number; slideId: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

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
        setError(true);
        // Don't fail the export over a remote-content fetch — just settle so the
        // exporter moves on. The error fallback already renders a useful state.
        exportRegistry.markSlideSettled(slideId);
        if (typeof console !== 'undefined') console.warn('MetaSkills fetch failed:', err.message);
      });
  }, [slideId]);

  const showScroll = revealStage >= 1 && content && !error;

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--мета-скіли</span>
      </h2>

      <div className="meta-skills-body">
        {/* Left — bullets accumulate across stages (3 → 4 → 5) */}
        <div className="meta-skills-bullets">
          <SlideItem delay={0.05}>
            найважливіший скіл у вашому маркетплейсі — це{' '}
            <Emphasis color="green">скіл, що створює скіли</Emphasis>
          </SlideItem>

          <SlideItem delay={0.18}>
            використайте{' '}
            <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
              platform.claude.com/.../best-practices
            </SlideLink>{' '}
            як відправну точку
          </SlideItem>

          <SlideItem delay={0.31}>
            впроваджуйте best practices: оновлюйте скіл після кожного використання, годуйте його deep research звітами
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              або просто візьміть <Emphasis color="green">готовий</Emphasis> skill-creator від Anthropic:{' '}
              <SlideLink href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator">
                github.com/.../skill-creator
              </SlideLink>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              далі — баланс між <Emphasis color="green">готовими</Emphasis> та{' '}
              <Emphasis color="orange">кастомними in-house</Emphasis> скілами
            </SlideItem>
          )}
        </div>

        {/* Right — SKILL.md panel: full available height, ≈70% width.
            Reserved at all stages so the bullets column doesn't reflow on reveal. */}
        <div className="meta-skills-panel">
          <div className="meta-skills-panel__chrome meta-skills-panel__chrome--top">
            ░░░ SKILL.md — skill-creator ░░░
          </div>

          <div className="meta-skills-panel__viewport">
            {error ? (
              <div className="meta-skills-panel__error">✗ failed to fetch SKILL.md</div>
            ) : !showScroll ? (
              <div className="meta-skills-panel__placeholder">
                <span className="meta-skills-panel__loading-dot">●</span>
                <span className="meta-skills-panel__loading-dot">●</span>
                <span className="meta-skills-panel__loading-dot">●</span>
                {' '}loading SKILL.md
              </div>
            ) : (
              <div className="meta-skills-panel__scroll">
                {content}
                <div className="meta-skills-panel__scroll-divider">{content}</div>
              </div>
            )}
          </div>

          <div className="meta-skills-panel__chrome meta-skills-panel__chrome--bottom">
            [END OF TRANSMISSION]
          </div>
        </div>
      </div>
    </>
  );
}

export const MetaSkillsSlide: SlideDefinition = {
  id: 'meta-skills',
  maxRevealStages: 2,
  asyncSettle: true,
  content: ({ revealStage, slideId }: SlideContentProps) => <MetaSkillsContent revealStage={revealStage} slideId={slideId} />,
  notes: 'Мета-скіли — найвища точка важеля. Один добре зроблений скіл, що створює скіли, мультиплікує якість усього іншого. Stage 1: показуємо четвертий булет + панель SKILL.md. Stage 2: п\'ятий булет про баланс між готовими та кастомними скілами.',
};
