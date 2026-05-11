import { useRef, useEffect } from 'react';

interface UseTouchNavigationOptions {
  onNext: () => void;
  onPrev: () => void;
}

export function useTouchNavigation({ onNext, onPrev }: UseTouchNavigationOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const isInteractiveElement = (el: HTMLElement): boolean => {
      const tag = el.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT') return true;
      if (el.closest('.code-block')) return true;
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isInteractiveElement(e.target as HTMLElement)) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isInteractiveElement(e.target as HTMLElement)) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      // Must be a quick gesture (< 300ms)
      if (elapsed > 300) {
        // Treat as a tap instead
        handleTap(touch.clientX);
        return;
      }

      // Require horizontal movement to exceed vertical (not a scroll)
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      // Swipe threshold: 50px
      if (deltaX < -50) {
        onNext();
      } else if (deltaX > 50) {
        onPrev();
      }
    };

    const handleTap = (clientX: number) => {
      const width = window.innerWidth;
      const tapZone = clientX / width;

      if (tapZone < 0.2) {
        onPrev();
      } else if (tapZone > 0.8) {
        onNext();
      }
      // Center area (20%-80%) does nothing — allows links/interactive elements
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onNext, onPrev]);

  return { containerRef };
}
