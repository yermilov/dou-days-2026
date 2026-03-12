import skillsInfrastructureImage from '/skills-infrastructure.png?url';
import { SlideDefinition } from '../types/slides';

function SkillsInfrastructureSectionSlideContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', width: '100%' }}>
      <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem' }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">skills</span>{' '}
          <span className="text-orange">--infrastructure</span>
        </div>
        <div style={{ fontSize: '1.5rem' }} className="text-muted">
          // distribution, marketplace, and meta-skills
        </div>
      </div>

      <img
        src={skillsInfrastructureImage}
        alt="Skills Infrastructure"
        loading="lazy"
        style={{
          maxWidth: '100%',
          maxHeight: 'calc(var(--vh-full) - 240px)',
          objectFit: 'contain',
          borderRadius: '8px',
          border: '1px solid var(--terminal-border)',
          boxShadow: '0 0 30px rgba(126, 231, 135, 0.1)',
        }}
      />
    </div>
  );
}

export const SkillsInfrastructureSectionSlide: SlideDefinition = {
  id: 'skills-infrastructure-section',
  content: <SkillsInfrastructureSectionSlideContent />,
  notes: 'Transition to the skills infrastructure subsection — marketplace, distribution, and meta-skills',
};
