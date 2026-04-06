import { SlideDefinition } from '../types/slides';
import yarikBadges from '/yarik-badges.jpg?url';

type Level = 'high' | 'medium' | 'low';

const levelStyles = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    labelColor: 'var(--terminal-white)',
    labelGlow: '0 0 20px rgba(240, 136, 62, 0.3)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-blue)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    opacity: 1,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-dim)',
    labelColor: 'var(--terminal-white)',
    labelGlow: 'none',
    opacity: 0.85,
  },
};

function BioItem({ level, children }: { level: Level; children: React.ReactNode }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: 'var(--slide-text-normal)',
        opacity: s.opacity,
        marginBottom: '0.35rem',
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold' }}>{s.prefix}</span>
      <span
        style={{
          color: s.labelColor,
          textShadow: s.labelGlow,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function BioSection({ title, children, titleSize }: { title: string; children: React.ReactNode; titleSize?: string }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        className="section-header section-header--blue"
        style={{
          borderBottom: '1px solid var(--terminal-border)',
          paddingBottom: '0.2rem',
          ...(titleSize ? { fontSize: titleSize } : {}),
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>{children}</div>
    </div>
  );
}

export const BioSlide: SlideDefinition = {
  id: 'bio',
  maxRevealStages: 5,
  content: ({ revealStage }) => (
    <div className="bio-slide">
      <div className="bio-slide-content">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <span className="text-dim">$</span> whoami
        </h2>

        <div style={{ textAlign: 'left' }}>
          <BioSection title="almost 9 years at Grammarly / Superhuman" titleSize="1.6rem">
            <BioItem level="high">0 -&gt; 1 projects</BioItem>
            {revealStage >= 1 && (
              <BioItem level="high">in 2025: rolling out AI coding agents across the company</BioItem>
            )}
            {revealStage >= 2 && (
              <BioItem level="medium">before that: tech lead of platform organization</BioItem>
            )}
            {revealStage >= 3 && (
              <BioItem level="medium">before that: tech lead of feature frameworks</BioItem>
            )}
            {revealStage >= 4 && (
              <BioItem level="medium">before that: led product features</BioItem>
            )}
            {revealStage >= 5 && (
              <BioItem level="low">started as Java backend engineer</BioItem>
            )}
          </BioSection>
        </div>
      </div>
      <img
        src={yarikBadges}
        alt="Grammarly badges"
        className="bio-slide-image"
        style={{ maxWidth: '480px' }}
        loading="lazy"
      />
    </div>
  ),
};
