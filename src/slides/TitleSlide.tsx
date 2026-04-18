import { SlideDefinition } from '../types/slides';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  content: (
    <div className="title-slide">
      <h1 className="hero title-glow">Невигадані історії AI-first трансформації в інженерних командах</h1>
      <p className="title-tagline">(про які неможливо мовчати)</p>
      <p className="title-subtitle">Ярослав Єрмілов, Principal Software Engineer @ Superhuman/Grammarly</p>
    </div>
  ),
};
