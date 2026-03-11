import { SECTIONS } from '../data/sections';
import { SlideDefinition } from '../types/slides';

function AgendaSlideContent() {
  return (
    <div className="agenda-slide">
      <div className="agenda-header">
        <div className="agenda-command">
          <span className="text-dim">$</span>{' '}
          <span className="text-green">./session --agenda</span>
        </div>
        <div className="agenda-subtitle text-muted">// what we're covering today</div>
      </div>

      <div className="agenda-grid">
        {SECTIONS.map((section) => (
          <div key={section.part} className="agenda-card">
            <div className="agenda-card-command">
              <span className="text-dim">$</span>{' '}
              <span className="text-green agenda-card-cmd-text">
                ./session --part {section.part}
              </span>
            </div>
            <div className="agenda-card-image-wrap">
              <img
                src={section.image}
                alt={section.alt}
                loading="lazy"
                className="agenda-card-image"
              />
            </div>
            <div className="agenda-card-desc text-muted">{section.desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        .agenda-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          padding: 0 1rem;
        }

        .agenda-header {
          text-align: center;
          line-height: 1.4;
        }

        .agenda-command {
          font-size: 2rem;
        }

        .agenda-subtitle {
          font-size: 1.4rem;
          margin-top: 0.25rem;
        }

        .agenda-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          width: 100%;
          max-width: 960px;
        }

        .agenda-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 0.75rem;
          border: 1px solid var(--terminal-border);
          border-radius: 8px;
          background: var(--terminal-bg-elevated);
          box-shadow: 0 0 0 transparent;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          cursor: default;
        }

        .agenda-card:hover {
          border-color: var(--terminal-green-dim);
          box-shadow: 0 0 18px var(--terminal-green-glow);
          transform: translateY(-2px);
        }

        .agenda-card-command {
          font-size: 1.1rem;
          text-align: center;
        }

        .agenda-card-cmd-text {
          font-size: 1.1rem;
        }

        .agenda-card-image-wrap {
          width: 100%;
          max-height: calc(var(--vh-full) - 420px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .agenda-card-image {
          width: 100%;
          max-height: calc(var(--vh-full) - 420px);
          object-fit: contain;
          border-radius: 4px;
          border: 1px solid var(--terminal-border);
        }

        .agenda-card-desc {
          font-size: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  content: <AgendaSlideContent />,
};
