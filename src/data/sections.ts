import agendaEngineerImage from '/agenda-engineer.png?url';
import agendaTeamImage from '/agenda-team.png?url';
import agendaOrgImage from '/agenda-org.png?url';

export interface SectionData {
  part: number;
  image: string;
  alt: string;
  desc: string;
}

export const SECTIONS: SectionData[] = [
  { part: 1, image: agendaEngineerImage, alt: 'AI-First Engineer',     desc: '// ai-first engineer' },
  { part: 2, image: agendaTeamImage,     alt: 'AI-First Team',         desc: '// ai-first team' },
  { part: 3, image: agendaOrgImage,      alt: 'AI-First Organization', desc: '// ai-first organization' },
];
