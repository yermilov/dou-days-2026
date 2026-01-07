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
        fontSize: '1.6rem',
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

function BioSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          color: 'var(--terminal-blue)',
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          marginBottom: '0.6rem',
          borderBottom: '1px solid var(--terminal-border)',
          paddingBottom: '0.2rem',
          textTransform: 'uppercase',
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
  content: (
    <div className="bio-slide">
      <div className="bio-slide-content">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <span className="text-dim">$</span> whoami
        </h2>

        <div style={{ textAlign: 'left' }}>
          <BioSection title="8 років в греммерлі / суперхьюмані">
            <BioItem level="high">зараз займаюся АІ-кодінг агентами</BioItem>
            <BioItem level="high">не написав вручну жодного рядка коду з травня минулого року</BioItem>
            <BioItem level="medium">до цього: техлідив платформену організацію</BioItem>
            <BioItem level="medium">до цього: лідив продуктові фічі</BioItem>
            <BioItem level="low">до цього: працював на бекенді</BioItem>
          </BioSection>

          <BioSection title="connect">
            <BioItem level="high">
              пишу постійно в{' '}
              <a
                href="https://www.linkedin.com/in/yarik-yermilov/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--terminal-blue)',
                  textDecoration: 'none',
                  borderBottom: '1px dashed var(--terminal-blue)',
                }}
              >
                LinkedIn
              </a>
            </BioItem>
          </BioSection>
        </div>
      </div>
      <img
        src={yarikBadges}
        alt="Grammarly badges"
        className="bio-slide-image"
      />
    </div>
  ),
};
