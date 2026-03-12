import agendaEngineerImage from '/agenda-engineer.png?url';
import agendaTeamImage from '/agenda-team.png?url';
import agendaOrgImage from '/agenda-org.png?url';
import skillsInfrastructureImage from '/skills-infrastructure.png?url';

export interface SubsectionData {
  command: string;
  image: string;
  alt: string;
  desc: string;
  slideId: string;
}

export interface SectionData {
  part: number;
  image: string;
  alt: string;
  desc: string;
  slideId: string;
  subsections?: SubsectionData[];
}

export const SECTIONS: SectionData[] = [
  { part: 1, image: agendaEngineerImage, alt: 'AI-First Engineer',     desc: '// ai-first engineer',     slideId: 'agenda-engineer' },
  { part: 2, image: agendaTeamImage,     alt: 'AI-First Team',         desc: '// ai-first team',         slideId: 'agenda-team',
    subsections: [
      { command: 'skills --infrastructure', image: skillsInfrastructureImage, alt: 'Skills Infrastructure', desc: '// distribution & marketplace', slideId: 'skills-infrastructure-section' },
    ],
  },
  { part: 3, image: agendaOrgImage,      alt: 'AI-First Organization', desc: '// ai-first organization', slideId: 'agenda-org' },
];
