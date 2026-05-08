import { useEffect, useRef } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import warcraftComplete from '/warcraft-complete.wav?url';
import warcraftYes from '/warcraft-yes.wav?url';
import warcraftWhat from '/warcraft-what.wav?url';
import peasantFace from '/warcraft-peasant-permission.jpeg?url';

const PROMPT_CODE = `claude> Fetch the Warcraft 2 peon/peasant quotes page at warcraft.wiki.gg/wiki/Quotes_of_Warcraft_II#Peon and download the Ready, Yes, Job Complete and What sounds for both Peasant (Alliance) and Peon (Horde). Skip the "Pissed" category.

Organize them into ~/.claude/sounds/warcraft2/{ready,yes,complete,what}/.

Use curl with a browser User-Agent header and download files sequentially with small delays to avoid rate limiting. Verify each .wav with \`file\` — it must report RIFF/WAVE, not ASCII or JSON.

Then add two hooks to the global ~/.claude/settings.json: a Notification hook that plays a random "What?" sound when Claude waits for permission, and a Stop hook that plays a random ready/yes/complete sound when the session ends. Both with afplay -v 1.5.

Use @claude-code-guide (agent) to confirm hook format.`;

function WarcraftFunContent({ revealStage }: { revealStage: number }) {
  // Track which stages have already triggered audio so re-renders within the
  // same stage don't replay the cascade.
  const triggeredRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (triggeredRef.current.has(revealStage)) return;

    if (revealStage === 2) {
      triggeredRef.current.add(2);
      const a = new Audio(warcraftComplete);
      a.volume = 0.95;
      void a.play().catch(() => {});
      return;
    }

    if (revealStage === 3) {
      triggeredRef.current.add(3);
      // 2000s computer-club cacophony: stagger seven plays across ~1.6s,
      // overlapping yes/complete/what so the office sounds chaotic.
      const cascade = [
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
        warcraftComplete,
        warcraftWhat,
        warcraftYes,
      ];
      const timers = cascade.map((src, i) =>
        window.setTimeout(() => {
          const a = new Audio(src);
          a.volume = 0.7;
          void a.play().catch(() => {});
        }, i * 220),
      );
      return () => {
        timers.forEach(window.clearTimeout);
      };
    }
  }, [revealStage]);

  const showImage = revealStage === 1;
  const showCode = revealStage >= 2;

  return (
    <>
      <style>{`
        /* Scoped overrides — keep the panel wide and let the prompt prose wrap
           to the panel width. We render a plain <pre> (not CodeBlock) so
           there are no SyntaxHighlighter inline styles to fight. */
        .warcraft-fun-body .warcraft-fun-bullets { flex: 0 0 36%; }
        .warcraft-fun-body { gap: 40px; }
        .warcraft-fun-prompt {
          flex: 1 1 auto;
          margin: 0;
          padding: 1.4rem 1.6rem;
          font-family: var(--font-mono);
          font-size: var(--slide-text-code);
          line-height: var(--line-height-relaxed);
          color: #e2e8f0;
          white-space: pre-wrap;
          word-break: normal;
          overflow-wrap: anywhere;
          overflow: auto;
        }
        .warcraft-fun-prompt b {
          color: var(--dou-mint);
          font-weight: 600;
        }
      `}</style>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">а бувало у вас таке</span>
      </h2>

      <div className="warcraft-fun-body">
        {/* Left column — bullets accumulate across reveal stages. */}
        <div className="warcraft-fun-bullets">
          {revealStage >= 1 && revealStage < 3 && (
            <SlideItem delay={0.05}>
              що ви запускали клода з великою задачею, а повернувшись через{' '}
              <Emphasis color="orange">30 хвилин</Emphasis> дізнавалися що він одразу
              зупинився на дозволі зробити <Emphasis color="green">grep</Emphasis> по
              вашому коду?
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              зробіть <Emphasis color="green">скіл</Emphasis> який буде вмикати{' '}
              <Emphasis color="orange">звук юніта із воркрафта</Emphasis> кожен раз як клод зупиняється
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              але якщо цей скіл буде в <Emphasis color="orange">маркетплейсі</Emphasis>
              {' '}— готуйтесь до того що ваш офіс буде звучати як{' '}
              <Emphasis color="green">комп'ютерний клуб 2000-х</Emphasis>
            </SlideItem>
          )}
        </div>

        {/* Right column — image at stage 1, framed prompt panel at stage 2+. */}
        {showImage && (
          <div
            className="warcraft-fun-right warcraft-fun-right--image"
            key="image"
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'metaSkillsPanelIn 480ms cubic-bezier(0.19, 1, 0.22, 1) both',
            }}
          >
            <img
              src={peasantFace}
              alt="Warcraft II peasant — work, work."
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                borderRadius: '14px',
                boxShadow:
                  '0 18px 48px color-mix(in srgb, var(--dou-near-black) 60%, transparent)',
                border:
                  '1px solid color-mix(in srgb, var(--dou-mint) 35%, transparent)',
              }}
            />
          </div>
        )}

        {showCode && (
          <div className="warcraft-fun-panel" key="code">
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--top">
              ░░░ prompt ░░░
            </div>
            <div className="warcraft-fun-panel__viewport">
              <pre className="warcraft-fun-prompt">{PROMPT_CODE}</pre>
            </div>
            <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--bottom">
              [WORK COMPLETE]
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const WarcraftFunSlide: SlideDefinition = {
  id: 'warcraft-fun',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <WarcraftFunContent revealStage={revealStage} />,
  notes:
    'Stage 0: тільки заголовок-питання. Stage 1: знайомий біль (зупинка на grep) + peasant face. Stage 2: рішення — скіл зі звуком на Stop хук + промпт + один "work complete". Stage 3: маркетплейс-наслідок + каскад звуків як у комп\'ютерному клубі 2000-х.',
};
