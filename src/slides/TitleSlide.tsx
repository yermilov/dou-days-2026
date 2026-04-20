import { SlideDefinition } from '../types/slides';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  hero: true,
  content: (
    <div className="title-hero">
      <div className="title-hero__block">
        <span className="title-hero__tag">Київ, 2026</span>
        <h1 className="title-hero__title">
          Невигадані історії AI-first трансформації в інженерних командах
        </h1>
        <div className="title-hero__description">
          <p className="title-hero__tagline">(про які неможливо мовчати)</p>
          <p className="title-hero__speaker">
            Ярослав Єрмілов, Principal Software Engineer @ Superhuman/Grammarly
          </p>
        </div>
      </div>
    </div>
  ),
};
