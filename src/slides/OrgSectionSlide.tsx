import agendaOrgImage from '/agenda-org.png?url';
import { SlideDefinition } from '../types/slides';
import { SectionTitleSlide } from '../components/SectionTitleSlide';

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
