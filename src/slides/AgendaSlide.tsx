import { SECTIONS } from '../data/sections';
import { SlideDefinition } from '../types/slides';
import { useNavigation } from '../context/NavigationContext';

function AgendaSlideContent() {
  const { goToSlideById } = useNavigation();

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
          <div key={section.part} className="agenda-column">
            <div className="agenda-card" onClick={() => goToSlideById(section.slideId)} style={{ cursor: 'pointer' }}>
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

            {section.subsections?.map((sub) => (
              <div key={sub.command} className="agenda-card agenda-subcard" onClick={() => goToSlideById(sub.slideId)} style={{ cursor: 'pointer' }}>
                <div className="agenda-card-command">
                  <span className="text-dim">$</span>{' '}
                  <span className="text-orange agenda-card-cmd-text">{sub.command}</span>
                </div>
                <div className="agenda-card-image-wrap agenda-subcard-image-wrap">
                  <img
                    src={sub.image}
                    alt={sub.alt}
                    loading="lazy"
                    className="agenda-card-image"
                  />
                </div>
                <div className="agenda-card-desc text-muted">{sub.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .agenda-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
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
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
          max-width: 960px;
          align-items: start;
        }

        .agenda-column {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .agenda-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 0.75rem;
          border: 1px solid var(--terminal-border);
          border-radius: 8px;
          background: var(--terminal-bg-elevated);
          box-shadow: 0 0 0 transparent;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }

        .agenda-card:hover {
          border-color: var(--terminal-green-dim);
          box-shadow: 0 0 18px var(--terminal-green-glow);
          transform: translateY(-2px);
        }

        .agenda-subcard {
          border-color: color-mix(in srgb, var(--terminal-orange) 30%, var(--terminal-border));
          padding: 0.5rem 0.6rem;
          gap: 0.35rem;
        }

        .agenda-subcard:hover {
          border-color: var(--terminal-orange);
          box-shadow: 0 0 18px rgba(240, 136, 62, 0.2);
        }

        .agenda-card-command {
          font-size: 1rem;
          text-align: center;
        }

        .agenda-card-cmd-text {
          font-size: 1rem;
        }

        .agenda-subcard .agenda-card-command {
          font-size: 0.85rem;
        }

        .agenda-subcard .agenda-card-cmd-text {
          font-size: 0.85rem;
        }

        .agenda-card-image-wrap {
          width: 100%;
          max-height: calc(var(--vh-full) * 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .agenda-subcard-image-wrap {
          max-height: calc(var(--vh-full) * 0.10);
        }

        .agenda-card-image {
          width: 100%;
          max-height: inherit;
          object-fit: contain;
          border-radius: 4px;
          border: 1px solid var(--terminal-border);
        }

        .agenda-card-desc {
          font-size: 0.95rem;
          text-align: center;
        }

        .agenda-subcard .agenda-card-desc {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}

export const AgendaSlide: SlideDefinition = {
  id: 'agenda',
  content: <AgendaSlideContent />,
};
