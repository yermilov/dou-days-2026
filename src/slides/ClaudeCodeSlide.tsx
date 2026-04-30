import { ReactNode } from 'react';
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
  <Prompt>hey claude, build static web site from scratch using Bun + React stack</Prompt>,
  <Prompt>hey claude, research internet for materials</Prompt>,
  <Prompt>hey claude, study the dou template visually — sonar can land anywhere, even off-canvas</Prompt>,
  <Prompt>hey claude, find and download images</Prompt>,
  <Prompt>hey claude, generate images using Nano Banana Pro</Prompt>,
  <Prompt>hey claude, find all design-system overrides across slides and fix them</Prompt>,
  <Prompt>hey claude, wdyt about merging the adoption-curve and inception slides?</Prompt>,
];

const SCOPED_STYLES = `
  .cc-bullets .slide-item { margin-bottom: 0; }
`;

function ClaudeCodeContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{SCOPED_STYLES}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2>
          <span className="text-dim">//</span>{' '}
          <span className="text-green">наприклад</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* ── Left column: bullets ── */}
        <div className="cc-bullets" style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
          <SlideItem delay={0.05}>
            цю презентацію повністю створено у Claude Code
          </SlideItem>

          {TASKS.map((task, i) =>
            revealStage >= i + 1 ? (
              <SlideItem key={i} delay={0} reveal>
                {task}
              </SlideItem>
            ) : null,
          )}
        </div>

        {/* ── Right column: QR code + link ── */}
        <div style={{ flex: 1, alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <QRCodeSVG
            value={REPO_URL}
            size={380}
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
  maxRevealStages: 7,
  content: ({ revealStage }: SlideContentProps) => <ClaudeCodeContent revealStage={revealStage} />,
  notes:
    'Stage 0: ця презентація повністю створена у Claude Code + repo link + QR. Stages 1-7: reveal tasks one by one — build, research, compose, design, images, interactive, generate.',
};
