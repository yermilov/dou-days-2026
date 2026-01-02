import { useState, useCallback, useEffect } from 'react';

interface UseSlideNavigationReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  handleCommand: (command: string) => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  revealed: boolean;
}

export function useSlideNavigation(
  totalSlides: number,
  initialSlide: number = 0
): UseSlideNavigationReturn {
  // Parse initial slide from URL hash if present
  const getInitialSlide = (): number => {
    if (typeof window === 'undefined') return initialSlide;
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    if (match) {
      const slideNum = parseInt(match[1], 10) - 1; // Convert from 1-indexed
      if (slideNum >= 0 && slideNum < totalSlides) {
        return slideNum;
      }
    }
    return initialSlide;
  };

  const [currentSlide, setCurrentSlide] = useState(getInitialSlide);
  const [revealed, setRevealed] = useState(false);

  // Clamp slide index to valid range
  const clampIndex = useCallback(
    (index: number): number => {
      return Math.max(0, Math.min(index, totalSlides - 1));
    },
    [totalSlides]
  );

  // Update URL hash when slide changes
  const updateHash = useCallback((index: number) => {
    if (typeof window === 'undefined') return;
    const newHash = `#slide-${index + 1}`; // Convert to 1-indexed for URL
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, []);

  // Go to specific slide
  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = clampIndex(index);
      setCurrentSlide(clampedIndex);
      setRevealed(false);
      updateHash(clampedIndex);
    },
    [clampIndex, updateHash]
  );

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Parse and handle command input
  const handleCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim().toLowerCase();

      // Empty command - do nothing
      if (!trimmed) return;

      // Check for number (go to specific slide)
      const slideNumber = parseInt(trimmed, 10);
      if (!isNaN(slideNumber) && slideNumber > 0) {
        goToSlide(slideNumber - 1); // Convert from 1-indexed user input
        return;
      }

      // Navigation commands
      switch (trimmed) {
        case 'prev':
        case 'previous':
        case 'back':
        case 'b':
        case 'p':
          prevSlide();
          return;
        case 'first':
        case 'start':
        case 'home':
          goToSlide(0);
          return;
        case 'last':
        case 'end':
          goToSlide(totalSlides - 1);
          return;
        case 'reveal':
        case 'r':
          setRevealed(true);
          return;
        case 'next':
        case 'n':
        default:
          // Any unrecognized command advances to next slide
          nextSlide();
          return;
      }
    },
    [goToSlide, nextSlide, prevSlide, totalSlides]
  );

  // Keyboard navigation (when not focused on input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focused on input element
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#slide-(\d+)$/);
      if (match) {
        const slideNum = parseInt(match[1], 10) - 1;
        if (slideNum >= 0 && slideNum < totalSlides && slideNum !== currentSlide) {
          setCurrentSlide(slideNum);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [totalSlides, currentSlide]);

  // Set initial hash on mount
  useEffect(() => {
    updateHash(currentSlide);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    handleCommand,
    isFirstSlide: currentSlide === 0,
    isLastSlide: currentSlide === totalSlides - 1,
    revealed,
  };
}
