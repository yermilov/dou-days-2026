import { useState, useEffect } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import releaseCalendar from '/anthropic-release-calendar.jpg?url';

const STYLES = `
  @keyframes revealPanel {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .code-reveal {
    animation: revealPanel 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

const bullets = [
  <>recent progress from Anthropic shows a clear leap forward in software engineering processes</>,
  <>Anthropic releases Claude Code <Emphasis color="orange">15–20 internal releases per day</Emphasis>, including major new features every couple of days</>,
  <>Anthropic <Emphasis color="orange">builds the tools they use</Emphasis> — synergy between engineering culture and tooling; tight feedback loops between tool developers and tool users</>,
  <>Anthropic ships <Emphasis color="green">a lot of features, fast</Emphasis> — features are unpolished but receive immediate user feedback; "vibes" and direct feedback replace A/B tests and lengthy UX studies; features that don't resonate are removed without mercy</>,
  <>Anthropic tolerates frequent outages and performance degradations — and it <Emphasis color="green">doesn't hurt</Emphasis> company perception from users</>,
];

// --- types ---

type DayStatus = 'operational' | 'minor' | 'major' | 'critical';

interface ApiComponent {
  id: string;
  name: string;
  status: string;
  group: boolean;
  group_id: string | null;
}

interface ApiIncident {
  created_at: string;
  resolved_at: string | null;
  impact: string;
  components: Array<{ id: string; name: string }>;
}

interface ComponentRow {
  id: string;
  name: string;
  history: DayStatus[];
  uptime: number;
}

// --- helpers ---

const SEVERITY: Record<string, number> = { operational: 0, minor: 1, major: 2, critical: 3 };
const DAYS = 90;

function buildHistory(incidents: ApiIncident[], componentId: string): DayStatus[] {
  const now = new Date();
  const history: DayStatus[] = new Array(DAYS).fill('operational');

  const relevant = incidents.filter(inc =>
    !inc.components?.length || inc.components.some(c => c.id === componentId)
  );

  for (const inc of relevant) {
    const start = new Date(inc.created_at);
    const end = inc.resolved_at ? new Date(inc.resolved_at) : now;
    const impact = (SEVERITY[inc.impact] !== undefined ? inc.impact : 'minor') as DayStatus;

    for (let d = 0; d < DAYS; d++) {
      const dayAgo = DAYS - 1 - d;
      const dayStart = new Date(now.getTime() - dayAgo * 86_400_000);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart.getTime() + 86_400_000 - 1);

      if (start <= dayEnd && end >= dayStart) {
        if ((SEVERITY[impact] ?? 0) > (SEVERITY[history[d]] ?? 0)) {
          history[d] = impact;
        }
      }
    }
  }

  return history;
}

function calcUptime(history: DayStatus[]): number {
  const ok = history.filter(d => d === 'operational').length;
  return Math.round((ok / history.length) * 1000) / 10;
}

const BAR_COLOR: Record<DayStatus, string> = {
  operational: '#3fb950',
  minor: '#f0c040',
  major: '#f08840',
  critical: '#e05050',
};

// --- sub-components ---

function UptimeBars({ history }: { history: DayStatus[] }) {
  return (
    <div style={{ display: 'flex', gap: '1.5px', alignItems: 'flex-end', height: '20px' }}>
      {history.map((day, i) => (
        <div
          key={i}
          title={day}
          style={{
            flex: 1,
            height: day === 'operational' ? '14px' : day === 'minor' ? '16px' : '20px',
            background: BAR_COLOR[day],
            borderRadius: '1px',
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function ComponentHistoryRow({ row }: { row: ComponentRow }) {
  const uptimeColor = row.uptime >= 99.5
    ? 'var(--terminal-green)'
    : row.uptime >= 98
      ? '#f0c040'
      : '#f08840';

  return (
    <div style={{ marginBottom: '0.55rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '3px',
      }}>
        <span style={{
          color: 'var(--terminal-white)',
          fontFamily: 'var(--font-mono)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '68%',
        }}>
          {row.name}
        </span>
        <span style={{
          color: uptimeColor,
          fontFamily: 'var(--font-mono)',
          flexShrink: 0,
        }}>
          {row.uptime}%
        </span>
      </div>
      <UptimeBars history={row.history} />
    </div>
  );
}

function StatusHistoryPanel({
  label,
  componentsUrl,
  incidentsUrl,
  maxComponents = 5,
}: {
  label: string;
  componentsUrl: string;
  incidentsUrl: string;
  maxComponents?: number;
}) {
  const [rows, setRows] = useState<ComponentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(componentsUrl).then(r => r.json()),
      fetch(incidentsUrl).then(r => r.json()),
    ]).then(([compData, incData]) => {
      if (cancelled) return;

      const components: ApiComponent[] = compData.components ?? [];
      const incidents: ApiIncident[] = incData.incidents ?? [];

      // Top-level non-group components only (no group containers)
      const leaves = components
        .filter(c => !c.group && c.name !== 'Visit our website')
        .slice(0, maxComponents);

      const built: ComponentRow[] = leaves.map(c => {
        const history = buildHistory(incidents, c.id);
        return { id: c.id, name: c.name, history, uptime: calcUptime(history) };
      });

      setRows(built);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [componentsUrl, incidentsUrl, maxComponents]);

  return (
    <div style={{
      border: '1px solid var(--terminal-orange)',
      borderRadius: '4px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0,
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(240,136,62,0.12)',
        padding: '0.28rem 0.75rem',
        color: 'var(--terminal-orange)',
        fontFamily: 'var(--font-mono)',
        borderBottom: '1px solid rgba(240,136,62,0.35)',
        letterSpacing: '0.05em',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{label}</span>
        <span style={{ opacity: 0.55 }}>90d uptime</span>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        padding: '0.6rem 0.85rem 0.4rem',
        overflowY: 'auto',
        minHeight: 0,
      }}>
        {loading && (
          <span style={{ color: 'var(--terminal-white)', opacity: 0.4, fontFamily: 'var(--font-mono)' }}>
            fetching...
          </span>
        )}
        {rows.map(row => (
          <ComponentHistoryRow key={row.id} row={row} />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(240,136,62,0.15)',
        padding: '0.2rem 0.85rem',
        display: 'flex',
        gap: '1rem',
        flexShrink: 0,
      }}>
        {(['operational', 'minor', 'major', 'critical'] as DayStatus[]).map(s => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--terminal-white-muted)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '1px', background: BAR_COLOR[s] }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- slide ---

function IndustryPatternsContent({ revealStage }: SlideContentProps) {
  const visibleCount = Math.min(revealStage + 1, bullets.length);
  const showStatus = revealStage >= 4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <style>{STYLES}</style>

      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--ai-first-org</span>
      </h2>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        flex: 1,
        minHeight: 0,
        alignItems: 'flex-start',
      }}>
        {/* Left: bullets */}
        <div style={{
          flex: '0 0 52%',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {bullets.slice(0, visibleCount).map((bullet, i) => (
            <SlideItem key={i} delay={0}>{bullet}</SlideItem>
          ))}
        </div>

        {/* Right: image or status panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
        }}>
          {revealStage >= 1 && !showStatus && (
            <div key="image" className="code-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img
                src={releaseCalendar}
                alt="Anthropic release calendar — everything Claude Team shipped in 52 days"
                loading="lazy"
                style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          )}
          {showStatus && (
            <div key="status" className="code-reveal" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minWidth: 0,
              minHeight: 0,
              maxHeight: 'calc(var(--vh-full) - 310px)',
            }}>
              <StatusHistoryPanel
                label="status.claude.com"
                componentsUrl="https://status.claude.com/api/v2/components.json"
                incidentsUrl="https://status.claude.com/api/v2/incidents.json?page_size=100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const IndustryPatternsSlide: SlideDefinition = {
  id: 'industry-patterns',
  content: (props: SlideContentProps) => <IndustryPatternsContent {...props} />,
  maxRevealStages: 4,
  notes:
    'The meta-lesson: Anthropic eats their own dog food. That creates a feedback loop no external user study can replicate.',
};
