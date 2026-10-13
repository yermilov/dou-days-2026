import { SlideDefinition } from '../types/slides';
import { T } from '../context/LanguageContext';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  chrome: 'hero',
  content: (
    <div className="title-hero">
      <div className="title-hero__block">
        <span className="title-hero__tag"><T uk="Київ, 2026" en="Kyiv, 2026" /></span>
        <h1 className="title-hero__title">
          <T
            uk="Невигадані історії AI-first трансформації в інженерних командах"
            en="Real stories of AI-first transformation in engineering teams"
          />
        </h1>
        <div className="title-hero__description">
          <p className="title-hero__tagline"><T uk="(про які неможливо мовчати)" en="(that I can't keep quiet about)" /></p>
          <p className="title-hero__speaker">
            <T uk="Ярослав Єрмілов" en="Yaroslav Yermilov" />, Principal Software Engineer @ Superhuman (formerly Grammarly)
          </p>
        </div>
      </div>
    </div>
  ),
};
