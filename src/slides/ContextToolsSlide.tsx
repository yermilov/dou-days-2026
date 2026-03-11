import { SlideDefinition } from '../types/slides';
import { Code, Quote, SlideItem, SlideLink } from '../components/SlideElements';
import contextToolsGathering from '/context-tools-gathering.png?url';

export const ContextToolsSlide: SlideDefinition = {
  id: 'context-tools',
  content: (
    <div className="bg-image-slide">
      <img
        src={contextToolsGathering}
        alt="Context gathering sources - voice, PDFs, research, diagrams"
        className="bg-image-slide__background"
        loading="lazy"
      />

      <div className="bg-image-slide__content" style={{ maxWidth: '1100px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-orange">form the context</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 3rem' }}>
          <SlideItem delay={0.05}>
            describe your task in as much detail as possible (use{' '}
            <Code>/voice</Code>, or{' '}
            <SlideLink href="https://handy.computer/">handy.computer</SlideLink>{' '}
            or <SlideLink href="https://wisprflow.ai/">wisprflow.ai</SlideLink> if
            you prefer to dictate)
          </SlideItem>

          <SlideItem delay={0.15}>
            if the problem is complex enough — discuss it with a{' '}
            <Code>Deep Research</Code> agent like ChatGPT or Gemini first, and add
            the report to Claude Code
          </SlideItem>

          <SlideItem delay={0.25}>
            draw a diagram or design on paper, a whiteboard, or digitally —
            take a photo or screenshot and add it to Claude Code
          </SlideItem>

          <SlideItem delay={0.35}>
            find open-source projects that solve similar problems, ask Claude{' '}
            <Quote>browse these repos via gh cli for inspiration</Quote>
          </SlideItem>

          <SlideItem delay={0.45}>
            search for blog posts or articles on the topic and add the links (or{' '}
            <Code>pdf</Code>s)
          </SlideItem>

          <SlideItem delay={0.55}>
            don't use MCPs — use CLIs or skills instead
          </SlideItem>

        </div>
      </div>
    </div>
  ),
  notes:
    'Context building tools — describe task in detail, use Deep Research, add articles/PDFs, browse open-source repos, add diagrams/screenshots, avoid MCPs use CLIs or skills',
};
