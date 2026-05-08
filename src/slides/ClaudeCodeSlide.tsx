import { ReactNode, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem } from '../components/SlideElements';

const REPO_URL = 'https://github.com/yermilov/dou-days-2026';

function Prompt({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
      }}
    >
      '{children}'
    </span>
  );
}

const TASKS: ReactNode[] = [
  <Prompt>hey claude, build static web site from scratch and deploy on github pages</Prompt>,
  <Prompt>hey claude, copy the dou day template design system</Prompt>,
  <Prompt>hey claude, generate qr code from link</Prompt>,
  <Prompt>hey claude, generate images using Gemini</Prompt>,
];

// TASKS reveal one-to-one with revealStage: TASKS[i] becomes visible at
// revealStage >= i. Stage 0 already shows the first prompt alongside the
// thesis, so the deck doesn't sit on a near-empty raw-HTML frame.
const QR_TASK_INDEX = 2;
const QR_REVEAL_STAGE = QR_TASK_INDEX;

// At and after this stage, the DOU design system is applied; before it, the
// slide renders in raw "unstyled HTML" mode (white bg, serif, black text)
// — a meta gag that mirrors the prompt actually performing the styling.
const DS_TASK_INDEX = 1;
const DS_REVEAL_STAGE = DS_TASK_INDEX;

const SCOPED_STYLES = `
  /* Smooth transitions whenever the .cc-no-ds class is added/removed on the
     stage viewport — chrome elements, background, and slide-content colors
     all ease into / out of the DOU look. */
  .stage-viewport,
  .stage-viewport .slide-chrome__city-badge,
  .stage-viewport .slide-chrome__logo-image,
  .stage-viewport .sonar-pattern {
    transition: opacity 0.55s ease, background 0.55s ease;
  }
  .stage-viewport .slide h2,
  .stage-viewport .slide h2 span,
  .stage-viewport .slide .slide-item,
  .stage-viewport .slide .slide-item span,
  .stage-viewport .slide a,
  .stage-viewport .slide a span {
    transition: color 0.55s ease;
  }

  /* === Stripped-DOU mode ============================================== */
  /* Hide chrome (logo, badge, sonar) — they belong to the design system. */
  .stage-viewport.cc-no-ds .slide-chrome__city-badge,
  .stage-viewport.cc-no-ds .slide-chrome__logo-image,
  .stage-viewport.cc-no-ds .sonar-pattern {
    opacity: 0;
  }

  /* Plain-page background + serif typography. */
  .stage-viewport.cc-no-ds {
    background: #ffffff;
  }
  .stage-viewport.cc-no-ds .slide,
  .stage-viewport.cc-no-ds .slide * {
    font-family: "Times New Roman", Times, serif !important;
  }

  /* Strip DOU palette from every text-bearing element on this slide. */
  .stage-viewport.cc-no-ds .slide h2,
  .stage-viewport.cc-no-ds .slide h2 span,
  .stage-viewport.cc-no-ds .slide .slide-item,
  .stage-viewport.cc-no-ds .slide .slide-item span {
    color: #000 !important;
    text-shadow: none !important;
  }

  /* SlideItem chevron is a magenta '>' from --dou-magenta — neutralise it. */
  .stage-viewport.cc-no-ds .slide .slide-item::before {
    color: #000 !important;
  }

  /* Italic prompt strings inside <Prompt> use --terminal-orange; reset. */
  .stage-viewport.cc-no-ds .slide .slide-item span[style*="terminal-orange"] {
    color: #000 !important;
  }

  /* Default-browser blue underlined link in the right column. */
  .stage-viewport.cc-no-ds .slide a {
    color: #0000EE !important;
    text-decoration: underline !important;
  }
  .stage-viewport.cc-no-ds .slide a span {
    color: #0000EE !important;
    font-weight: normal !important;
  }
`;

function ClaudeCodeContent({ revealStage }: { revealStage: number }) {
  // Toggle the "no-design-system" class on the stage viewport while the
  // user hasn't yet revealed the "copy the dou day template" prompt.
  const dsApplied = revealStage >= DS_REVEAL_STAGE;
  useEffect(() => {
    const vp = document.querySelector('.stage-viewport');
    if (!vp) return;
    if (dsApplied) {
      vp.classList.remove('cc-no-ds');
    } else {
      vp.classList.add('cc-no-ds');
    }
    return () => {
      vp.classList.remove('cc-no-ds');
    };
  }, [dsApplied]);

  return (
    <>
      <style>{SCOPED_STYLES}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">ну наприклад</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '1.5rem', alignItems: 'center', minHeight: 0 }}>

        {/* ── Left column: thesis + evidence list ── */}
        <div className="cc-bullets" style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
          <SlideItem delay={0.05}>
            цю презентацію повністю створено у Claude Code
          </SlideItem>

          <div
            aria-hidden
            style={{
              height: '1px',
              width: '60%',
              margin: '0.6rem 0 0.4rem',
              background: 'color-mix(in srgb, var(--dou-mint) 25%, transparent)',
            }}
          />

          {TASKS.map((task, i) =>
            revealStage >= i ? (
              <SlideItem key={i} delay={0} reveal>
                {task}
              </SlideItem>
            ) : null,
          )}
        </div>

        {/* ── Right column: link is always visible, QR pairs with its matching prompt ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
          {revealStage >= QR_REVEAL_STAGE && (
            <QRCodeSVG
              value={REPO_URL}
              size={520}
              bgColor="#270950"
              fgColor="#02feb9"
              level="M"
              style={{
                borderRadius: 'var(--dou-radius-card)',
                border: '1px solid color-mix(in srgb, var(--dou-mint) 35%, transparent)',
                boxShadow: '0 8px 32px color-mix(in srgb, var(--dou-near-black) 60%, transparent)',
                padding: '12px',
                background: 'var(--dou-deep-purple)',
              }}
            />
          )}

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              color: 'var(--dou-mint)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--slide-text-normal)',
              textDecoration: 'none',
              borderBottom: 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <span style={{ color: 'var(--dou-magenta)', fontWeight: 'bold' }}>$</span>
            github.com/yermilov/dou-days-2026
          </a>
        </div>

        </div>
      </div>
    </>
  );
}

export const ClaudeCodeSlide: SlideDefinition = {
  id: 'explore-and-have-fun',
  maxRevealStages: TASKS.length - 1,
  content: ({ revealStage }: SlideContentProps) => <ClaudeCodeContent revealStage={revealStage} />,
  notes:
    `Stage 0: thesis + first prompt ('build static web site...'), raw-HTML look. Stage ${DS_REVEAL_STAGE} ('copy the dou day template design system'): DOU design system snaps in. Stage ${QR_REVEAL_STAGE} ('generate qr code from link'): right-column QR appears alongside its matching prompt.`,
};
