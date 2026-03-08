import agendaEngineerImage from '/agenda-engineer.png?url';
import agendaTeamImage from '/agenda-team.png?url';
import agendaOrgImage from '/agenda-org.png?url';
import { SlideDefinition } from '../types/slides';

function SectionTitleSlide({
  src,
  alt,
  part,
  desc,
}: {
  src: string;
  alt: string;
  part: number;
  desc: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        width: '100%',
      }}
    >
      <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem' }}>
          <span className="text-dim">$</span>{' '}
          <span style={{ color: 'var(--terminal-green)' }}>./session --part {part}</span>
        </div>
        <div style={{ fontSize: '1.5rem' }} className="text-muted">
          {desc}
        </div>
      </div>

      <img
        src={src}
        alt={alt}
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

export const EngineerSectionSlide: SlideDefinition = {
  id: 'agenda-engineer',
  content: (
    <SectionTitleSlide
      src={agendaEngineerImage}
      alt="AI-First Engineer"
      part={1}
      desc="// ai-first engineer"
    />
  ),
};

export const TeamSectionSlide: SlideDefinition = {
  id: 'agenda-team',
  content: (
    <SectionTitleSlide
      src={agendaTeamImage}
      alt="AI-First Team"
      part={2}
      desc="// ai-first team"
    />
  ),
};

export const OrgSectionSlide: SlideDefinition = {
  id: 'agenda-org',
  content: (
    <SectionTitleSlide
      src={agendaOrgImage}
      alt="AI-First Organization"
      part={3}
      desc="// ai-first organization"
    />
  ),
};
