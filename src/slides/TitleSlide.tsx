import { SlideDefinition } from '../types/slides';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  content: (
    <div className="title-slide">
      <h1 className="hero title-glow">AI-First Transformation From Within</h1>
      <p className="title-tagline">Patterns and Anti-Patterns Learned by Superhuman Engineers</p>
      <p className="title-subtitle">Yaroslav Yermilov, Principal Software Engineer @ Superhuman/Grammarly</p>
    </div>
  ),
};
