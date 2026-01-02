import { PresentationProps } from '../types/slides';
import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { Slide } from './Slide';
import { TerminalInput } from './TerminalInput';
import { SlideProgress } from './SlideProgress';
import { Timer } from './Timer';

export function Presentation({ slides, initialSlide = 0 }: PresentationProps) {
  const { currentSlide, handleCommand, revealed } = useSlideNavigation(
    slides.length,
    initialSlide
  );

  const activeSlide = slides[currentSlide];

  if (!activeSlide) {
    return null;
  }

  const slideContent =
    typeof activeSlide.content === 'function'
      ? activeSlide.content({ revealed })
      : activeSlide.content;

  return (
    <div className="presentation">
      <div className="slide-container" key={activeSlide.id}>
        <Slide
          isActive
          notes={activeSlide.notes}
          background={activeSlide.background}
        >
          {slideContent}
        </Slide>
      </div>
      <Timer />
      <SlideProgress current={currentSlide + 1} total={slides.length} />
      <TerminalInput
        onCommand={handleCommand}
        placeholder="type anything to continue, 'prev' to go back, or slide number..."
      />
    </div>
  );
}
