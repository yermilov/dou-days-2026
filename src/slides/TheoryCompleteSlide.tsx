import { SlideDefinition } from '../types/slides';
import chalkboardImage from '/theory-complete-chalkboard.png?url';

export const TheoryCompleteSlide: SlideDefinition = {
  id: 'theory-complete',
  content: (
    <div className="image-slide">
      <img src={chalkboardImage} alt="Це вся теорія, переходимо до практики" />
    </div>
  ),
  notes: 'Transition from theory to practice section.',
};
