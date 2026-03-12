import { SECTIONS } from '../data/sections';
import { SlideDefinition } from '../types/slides';
import { useNavigation } from '../context/NavigationContext';

function AgendaSlideContent() {
  const { goToSlideById } = useNavigation();
  const subsections = SECTIONS.flatMap(s => s.subsections ?? []);

  return (
    <div className="agenda-slide">
      <style>{`
        .agenda-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          width: 100%;
          padding: 0 1rem;
        }

        .agenda-header {
          text-align: center;
          line-height: 1.3;
        }

        .agenda-command { font-size: 2rem; }
        .agenda-subtitle { font-size: 1.3rem; margin-top: 0.2rem; }

        /* ── Top row: 3 main section cards ── */
        .agenda-sections-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 1020px;
        }

        /* ── Connector: label + divider between rows ── */
        .agenda-connector {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          max-width: 1020px;
        }

        .agenda-connector-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            color-mix(in srgb, var(--terminal-orange) 40%, var(--terminal-border)),
            transparent
          );
        }

        .agenda-connector-label {
          font-size: 0.8rem;
          color: var(--terminal-orange);
          opacity: 0.65;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        /* ── Bottom row: subsections ── */
        .agenda-subs-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 1020px;
        }

        /* ── Cards ── */
        .agenda-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 0.7rem;
          border: 1px solid var(--terminal-border);
          border-radius: 8px;
          background: var(--terminal-bg-elevated);
          cursor: pointer;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }

        .agenda-card:hover {
          border-color: var(--terminal-green-dim);
          box-shadow: 0 0 18px var(--terminal-green-glow);
          transform: translateY(-2px);
        }

        .agenda-subcard {
          border-color: color-mix(in srgb, var(--terminal-orange) 30%, var(--terminal-border));
          border-left: 2px solid color-mix(in srgb, var(--terminal-orange) 55%, transparent);
        }

        .agenda-subcard:hover {
          border-color: var(--terminal-orange);
          border-left-color: var(--terminal-orange);
          box-shadow: 0 0 18px rgba(240, 136, 62, 0.2);
        }

        .agenda-card-command {
          font-size: 0.95rem;
          text-align: center;
        }

        .agenda-subcard .agenda-card-command {
          font-size: 0.82rem;
        }

        .agenda-img-wrap {
          width: 100%;
          max-height: calc(var(--vh-full) * 0.19);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .agenda-sub-img-wrap {
          max-height: calc(var(--vh-full) * 0.115);
        }

        .agenda-card-image {
          width: 100%;
          max-height: inherit;
          object-fit: contain;
          border-radius: 4px;
          border: 1px solid var(--terminal-border);
        }

        .agenda-card-desc {
          font-size: 0.85rem;
          text-align: center;
        }

        .agenda-subcard .agenda-card-desc {
          font-size: 0.78rem;
        }
      `}</style>

      {/* Header */}
      <div className="agenda-header">
        <div className="agenda-command">
          <span className="text-dim">$</span>{' '}
          <span className="text-green">./session --agenda</span>
        </div>
        <div className="agenda-subtitle text-muted">// what we're covering today</div>
      </div>

      {/* Row 1: main sections */}
      <div className="agenda-sections-row">
        {SECTIONS.map((section) => (
          <div
            key={section.part}
            className="agenda-card"
            onClick={() => goToSlideById(section.slideId)}
          >
            <div className="agenda-card-command">
              <span className="text-dim">$</span>{' '}
              <span className="text-green">./session --part {section.part}</span>
            </div>
            <div className="agenda-img-wrap">
              <img src={section.image} alt={section.alt} loading="lazy" className="agenda-card-image" />
            </div>
            <div className="agenda-card-desc text-muted">{section.desc}</div>
          </div>
        ))}
      </div>

      {/* Connector */}
      {subsections.length > 0 && (
        <div className="agenda-connector">
          <div className="agenda-connector-line" />
          <span className="agenda-connector-label">// part 2 deep dives</span>
          <div className="agenda-connector-line" />
        </div>
      )}

      {/* Row 2: subsections */}
      {subsections.length > 0 && (
        <div className="agenda-subs-row">
          {subsections.map((sub) => (
            <div
              key={sub.command}
              className="agenda-card agenda-subcard"
              onClick={() => goToSlideById(sub.slideId)}
            >
              <div className="agenda-card-command">
                <span className="text-dim">$</span>{' '}
                <span className="text-orange">{sub.command}</span>
              </div>
              <div className="agenda-img-wrap agenda-sub-img-wrap">
                <img src={sub.image} alt={sub.alt} loading="lazy" className="agenda-card-image" />
              </div>
              <div className="agenda-card-desc text-muted">{sub.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  content: <AgendaSlideContent />,
};
