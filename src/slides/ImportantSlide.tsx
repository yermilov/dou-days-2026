import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';
import importantImage from '/important-slide.png?url';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: (
    <div className="bg-image-slide">
      <img
        src={importantImage}
        alt="Important balance between human expertise and AI"
        className="bg-image-slide__background"
        loading="lazy"
      />

      <div className="bg-image-slide__content">
        <SlideItem delay={0.05}>
          if you know a topic well, Claude almost certainly understands it{' '}
          <Emphasis color="orange">worse</Emphasis> than you
        </SlideItem>

        <SlideItem delay={0.12}>
          often you can write code{' '}
          <Emphasis color="orange">MUCH</Emphasis> better than it
        </SlideItem>

        <SlideItem delay={0.19}>
          often you can also write code even{' '}
          <Emphasis color="orange">faster</Emphasis> than it
        </SlideItem>

        <SlideItem delay={0.26}>
          but its value is that you can give it a task and{' '}
          <Emphasis>switch to something else</Emphasis>
        </SlideItem>

        <SlideItem delay={0.33}>
          or run two tasks in parallel with two Claudes and switch to something
          else
        </SlideItem>

        <SlideItem delay={0.40}>
          or run four tasks and go eat / sleep
        </SlideItem>

        <SlideItem delay={0.47}>
          in most cases Claude doesn't improve the quality or speed of your work
          — it increases the <Emphasis>volume</Emphasis> of your work
        </SlideItem>

        <SlideItem delay={0.54}>
          if you let it work while you just stare at the terminal —
          you're most likely{' '}
          <Emphasis color="orange">losing productivity</Emphasis>
        </SlideItem>

        <SlideItem delay={0.61}>
          <Emphasis>the one important exception</Emphasis> — technologies you
          know nothing about, here you can save hours to weeks
        </SlideItem>
      </div>
    </div>
  ),
  notes:
    'Important reality check - Claude is not better than you in your domain, value is in parallelization and delegation, watching Claude work is often counterproductive, exception is unfamiliar technologies',
};
