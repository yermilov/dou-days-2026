import { SlideDefinition } from '../types/slides';
import { Quote, SlideItem } from '../components/SlideElements';
import dialogueFlow from '/dialogue-flow.png?url';
import dialogueMemory from '/dialogue-memory.png?url';

export const DialogueSlide: SlideDefinition = {
  id: 'dialogue',
  content: (
    <div className="mcp-slide">
      <img
        src={dialogueFlow}
        alt="Step-by-step dialogue flow"
        className="mcp-slide-image-left"
      />

      <div className="mcp-slide-content">
        <h2 style={{ marginBottom: '2rem' }}>
          <span className="text-dim">$</span> діалог
        </h2>

        <SlideItem delay={0.05}>
          використовуйте принцип <Quote>сім раз відмір - один раз відріж</Quote>
        </SlideItem>

        <SlideItem delay={0.1}>
          за допомогою покрокового діалогу направляйте клод у правильний напрямок
        </SlideItem>

        <SlideItem delay={0.15}>
          <Quote>а подумай про ...</Quote>, <Quote>почитай тут ...</Quote>,{' '}
          <Quote>розглянь це ...</Quote>
        </SlideItem>

        <SlideItem delay={0.2}>
          для ллм-ок <Quote>найсвіжіші</Quote> <Quote>спогади</Quote>{' '}
          <Quote>найякравіші</Quote> — сформуйте їй правильне світосприйняття і
          тоді дайте задачу на вирішення останнім промптом
        </SlideItem>
      </div>

      <img
        src={dialogueMemory}
        alt="LLM memory recency"
        className="mcp-slide-image-right"
      />
    </div>
  ),
  notes: 'Dialogue principles for working with LLMs - measure twice, cut once',
};
