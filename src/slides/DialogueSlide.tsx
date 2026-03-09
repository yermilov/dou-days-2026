import { SlideDefinition } from '../types/slides';
import { Quote, SlideItem } from '../components/SlideElements';
import llmInfographic from '/llm-theory-infographic.png?url';

export const DialogueSlide: SlideDefinition = {
  id: 'dialogue',
  content: (
    <div className="bg-image-slide">
      <img
        src={llmInfographic}
        alt="How LLMs work: context + prompt → continuation"
        className="bg-image-slide__background"
        style={{ width: '55%', right: 'auto', objectPosition: 'center' }}
        loading="lazy"
      />

      <div className="bg-image-slide__content" style={{ marginLeft: '40%' }}>
        <h2 style={{ marginBottom: '2rem' }}>
          <span className="text-dim">$</span> more practically — context engineering
        </h2>

        <SlideItem delay={0.05}>
          apply the principle <Quote>measure twice, cut once</Quote>
        </SlideItem>

        <SlideItem delay={0.1}>
          use step-by-step dialogue to steer Claude in the right direction
        </SlideItem>

        <SlideItem delay={0.15}>
          <Quote>think about ...</Quote>, <Quote>read this ...</Quote>,{' '}
          <Quote>consider that ...</Quote>
        </SlideItem>

        <SlideItem delay={0.2}>
          for LLMs, the <Quote>most recent</Quote> <Quote>memories</Quote> are{' '}
          <Quote>the most vivid</Quote> — shape its worldview first, then give
          the task as the final prompt
        </SlideItem>
      </div>
    </div>
  ),
  notes: 'Dialogue principles for working with LLMs - measure twice, cut once',
};
