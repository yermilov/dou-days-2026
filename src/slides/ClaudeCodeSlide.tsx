import { ReactNode } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem } from '../components/SlideElements';

const REPO_URL = 'https://github.com/yermilov/ai-first-transformation-from-within-en';

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
  <Prompt>hey claude, compose slide ideas</Prompt>,
  <Prompt>hey claude, design layouts, aesthetics</Prompt>,
  <Prompt>hey claude, find and download images</Prompt>,
  <Prompt>hey claude, create interactive slides</Prompt>,
  <Prompt>hey claude, generate images using Nano Banana Pro</Prompt>,
];

const SCOPED_STYLES = `
  .cc-bullets .slide-item { margin-bottom: 0; }
`;

function ClaudeCodeContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{SCOPED_STYLES}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{ marginBottom: '0.8rem' }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--explore-and-have-fun</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2.5rem', alignItems: 'center', minHeight: 0 }}>

        {/* ── Left column: bullets ── */}
        <div className="cc-bullets" style={{ flex: '0 0 48%', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <SlideItem delay={0.05}>
            this presentation built entirely in the Claude Code
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <QRCodeSVG
            value={REPO_URL}
            size={380}
            bgColor="#141b24"
            fgColor="#7ee787"
            level="M"
            style={{
              borderRadius: 'var(--input-border-radius)',
              border: '2px solid var(--terminal-border)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              padding: '12px',
              background: '#141b24',
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
              color: 'var(--terminal-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--slide-text-normal)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <span style={{ color: 'var(--terminal-green)', fontWeight: 'bold', textShadow: 'var(--glow-text-green)' }}>$</span>
            github.com/yermilov/ai-first-transformation-from-within-en
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
    'Stage 0: presentation built in Claude Code + repo link + QR. Stages 1-7: reveal tasks one by one — build, research, compose, design, images, interactive, generate.',
};
