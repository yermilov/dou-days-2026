import agendaTeamImage from '/agenda-team.png?url';
import { SlideDefinition } from '../types/slides';
import { SectionTitleSlide } from '../components/SectionTitleSlide';

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
