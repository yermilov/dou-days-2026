import sdlcTracesImage from '/sdlc-traces.png?url';
import { SlideDefinition } from '../types/slides';

export const SdlcTracesSlide: SlideDefinition = {
  id: 'sdlc-traces',
  content: (
    <div className="image-slide">
      <img src={sdlcTracesImage} alt="Multiple SDLC traces" loading="lazy" />
    </div>
  ),
  notes: 'Every engineer takes a unique path through the SDLC — some skip design, some loop back from QA, some shortcut to commit. Same stages, different traces. This is why workflows look different but share the same building blocks.',
};
