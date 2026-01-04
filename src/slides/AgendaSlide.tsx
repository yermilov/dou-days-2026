import { SlideDefinition } from '../types/slides';

type Level = 'high' | 'medium' | 'low';

const levelStyles = {
  high: {
    prefix: '>>',
    prefixColor: 'var(--terminal-orange)',
    labelColor: 'var(--terminal-white)',
    labelGlow: '0 0 20px rgba(240, 136, 62, 0.3)',
    descColor: 'var(--terminal-green)',
    opacity: 1,
  },
  medium: {
    prefix: '> ',
    prefixColor: 'var(--terminal-white-dim)',
    labelColor: 'var(--terminal-white-dim)',
    labelGlow: 'none',
    descColor: 'var(--terminal-white-muted)',
    opacity: 0.85,
  },
  low: {
    prefix: '--',
    prefixColor: 'var(--terminal-white-muted)',
    labelColor: 'var(--terminal-white-muted)',
    labelGlow: 'none',
    descColor: 'var(--terminal-white-muted)',
    opacity: 0.5,
  },
};

function AgendaItem({ level, label, desc }: { level: Level; label: string; desc: string }) {
  const s = levelStyles[level];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr auto',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.25rem',
        opacity: s.opacity,
      }}
    >
      <span style={{ color: s.prefixColor, fontWeight: 'bold' }}>{s.prefix}</span>
      <span
        style={{
          color: s.labelColor,
          textShadow: s.labelGlow,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: s.descColor,
          fontSize: '1rem',
          fontStyle: 'italic',
        }}
      >
        {desc}
      </span>
    </div>
  );
}

function AgendaSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div
        style={{
          color: 'var(--terminal-blue)',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--terminal-border)',
          paddingBottom: '0.25rem',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</div>
    </div>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span> ./talk <span className="text-orange">--help</span>
      </h2>

      <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
        про що ми сьогодні будемо і не будемо говорити?
      </p>

      <div
        style={{
          textAlign: 'left',
          display: 'inline-block',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <AgendaSection title="tools">
          <AgendaItem level="high" label="claude code" desc="будемо багато" />
          <AgendaItem level="medium" label="codex, cursor" desc="будемо мало" />
          <AgendaItem level="low" label="інші тули" desc="майже не будемо" />
        </AgendaSection>

        <AgendaSection title="scope">
          <AgendaItem level="high" label="як прагматично використати claude code в хакатон режимі?" desc="будемо" />
          <AgendaItem level="medium" label="як довгостроково розвивати продукт використовуючи claude code?" desc="будемо трохи" />
        </AgendaSection>

        <AgendaSection title="audience">
          <AgendaItem level="high" label="claude code для інженерів" desc="будемо" />
          <AgendaItem level="low" label="claude code для не-інженерів" desc="майже не будемо" />
        </AgendaSection>
      </div>
    </>
  ),
};
