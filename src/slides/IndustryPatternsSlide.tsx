import { useState, useEffect, useCallback } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { exportRegistry } from '../components/exportRegistry';
import releaseCalendar from '../assets/anthropic-release-calendar.jpg?url';
import statusComponentsFallback from '../assets/status-components.json';
import statusIncidentsFallback from '../assets/status-incidents.json';

const bullets = [
  <>Anthropic релізить нову Claude Code/Desktop фічу <Emphasis color="orange">майже щодня</Emphasis></>,
  <>ці фічі, звісно, часто недополіровані, але команда отримує миттєвий <Emphasis color="green">вайб-чек</Emphasis> замість довгих A/B-тестів і UX-досліджень; що не зайшло користувачам — так само легко видаляється</>,
  <>ціна — часті outages та баги в продакшені, але парадоксально це практично <Emphasis color="orange">не шкодить</Emphasis> сприйняттю компанії з боку користувачів і інвесторів</>,
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

function buildRows(
  compData: { components?: ApiComponent[] } | null | undefined,
  incData: { incidents?: ApiIncident[] } | null | undefined,
  maxComponents: number,
): ComponentRow[] {
  const components: ApiComponent[] = compData?.components ?? [];
  const incidents: ApiIncident[] = incData?.incidents ?? [];
  const leaves = components
    .filter(c => !c.group && c.name !== 'Visit our website')
    .slice(0, maxComponents);
  return leaves.map(c => {
    const history = buildHistory(incidents, c.id);
    return { id: c.id, name: c.name, history, uptime: calcUptime(history) };
  });
}

// Semantic per-status colors. Treated like SVG fill constants per the design-system spec —
// these are an enum mapping, not arbitrary chrome colors.
const BAR_COLOR: Record<DayStatus, string> = {
  operational: '#3fb950',
  minor: '#f0c040',
  major: '#f08840',
  critical: '#e05050',
};

// --- sub-components ---

function UptimeBars({ history }: { history: DayStatus[] }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '36px' }}>
      {history.map((day, i) => (
        <div
          key={i}
          title={day}
          style={{
            flex: 1,
            height: day === 'operational' ? '24px' : day === 'minor' ? '30px' : '36px',
            background: BAR_COLOR[day],
            borderRadius: '2px',
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function ComponentHistoryRow({ row }: { row: ComponentRow }) {
  const uptimeColor = row.uptime >= 99.5
    ? 'var(--dou-mint)'
    : row.uptime >= 98
      ? BAR_COLOR.minor
      : BAR_COLOR.major;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '6px',
      }}>
        <span style={{
          color: 'var(--dou-white)',
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
  onComplete,
}: {
  label: string;
  componentsUrl: string;
  incidentsUrl: string;
  maxComponents?: number;
  onComplete?: (err?: Error) => void;
}) {
  // Seed with the bundled snapshot so the panel renders fully populated even
  // on a flaky connection; swap to live data once the fetch resolves.
  const [rows, setRows] = useState<ComponentRow[]>(() =>
    buildRows(statusComponentsFallback, statusIncidentsFallback, maxComponents)
  );

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(componentsUrl).then(r => r.json()),
      fetch(incidentsUrl).then(r => r.json()),
    ]).then(([compData, incData]) => {
      if (cancelled) return;
      setRows(buildRows(compData, incData, maxComponents));
      onComplete?.();
    }).catch((err: Error) => {
      if (!cancelled) onComplete?.(err);
    });

    return () => { cancelled = true; };
  }, [componentsUrl, incidentsUrl, maxComponents, onComplete]);

  return (
    <div className="industry-patterns-status">
      {/* Header */}
      <div className="industry-patterns-status__header">
        <span>{label}</span>
        <span className="industry-patterns-status__header-meta">90d uptime</span>
      </div>

      {/* Body */}
      <div className="industry-patterns-status__body">
        {rows.map(row => (
          <ComponentHistoryRow key={row.id} row={row} />
        ))}
      </div>

      {/* Footer */}
      <div className="industry-patterns-status__footer">
        {(['operational', 'minor', 'major', 'critical'] as DayStatus[]).map(s => (
          <span key={s} className="industry-patterns-status__legend-item">
            <span className="industry-patterns-status__legend-swatch" style={{ background: BAR_COLOR[s] }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- slide ---

function IndustryPatternsContent({ revealStage, slideId }: SlideContentProps) {
  const visibleCount = Math.min(revealStage + 1, bullets.length);
  const showStatus = revealStage >= 2;
  const handleStatusLoaded = useCallback(
    (err?: Error) => {
      if (err) {
        exportRegistry.markSlideError(slideId, err.message);
      } else {
        exportRegistry.markSlideSettled(slideId);
      }
    },
    [slideId]
  );

  return (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">AI-first</span>{' '}
        <span className="text-orange">організація</span>
      </h2>

      <div className="industry-patterns-body">
        {/* Left: bullets */}
        <div className="industry-patterns-bullets">
          {bullets.slice(0, visibleCount).map((bullet, i) => (
            <SlideItem key={i} delay={0}>{bullet}</SlideItem>
          ))}
        </div>

        {/* Right: bare release-calendar image on stages 0–1, framed status
            panel on stage 2. */}
        {showStatus ? (
          <div className="industry-patterns-panel" key="status">
            <div className="industry-patterns-panel__viewport">
              <StatusHistoryPanel
                label="status.claude.com"
                componentsUrl="https://status.claude.com/api/v2/components.json"
                incidentsUrl="https://status.claude.com/api/v2/incidents.json?page_size=100"
                onComplete={handleStatusLoaded}
              />
            </div>
          </div>
        ) : (
          <div
            className={
              'industry-patterns-image' +
              (revealStage >= 1 ? ' industry-patterns-image--zoom' : '')
            }
            key={`image-${revealStage >= 1 ? 'zoom' : 'static'}`}
          >
            <img
              src={releaseCalendar}
              alt="Календар релізів Anthropic — 52 дні релізів від Claude Team"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );
}

export const IndustryPatternsSlide: SlideDefinition = {
  id: 'industry-patterns',
  content: (props: SlideContentProps) => <IndustryPatternsContent {...props} />,
  maxRevealStages: bullets.length - 1,
  asyncSettle: true,
  notes:
    'Мета-урок: Anthropic їсть власну собачу їжу — будує інструменти, якими користується сама. Це створює feedback loop, який жодне зовнішнє юзер-дослідження не повторить. Stages 0–1: календар релізів — 15–20 внутрішніх збірок на день, мажорні фічі раз на кілька днів. Stage 2: жива сторінка status.claude.com — часті outage не вбивають сприйняття, бо швидкість важливіша за полірування.',
};
