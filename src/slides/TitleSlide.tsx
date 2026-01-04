import { SlideDefinition } from '../types/slides';

export const TitleSlide: SlideDefinition = {
  id: 'title',
  content: (
    <div className="title-slide">
      <h1 className="hero title-glow">Прагматичний вайб клодінг</h1>
      <p className="title-subtitle">Ярослав Єрмілов, Principal Software Engineer @ Superhuman/Grammarly</p>
    </div>
  ),
};
