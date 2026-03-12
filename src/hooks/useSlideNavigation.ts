import { useState, useCallback, useEffect, useRef } from 'react';
import { SlideDefinition } from '../types/slides';

interface UseSlideNavigationReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  revealNext: () => void;
  revealPrev: () => void;
  handleCommand: (command: string) => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  revealStage: number;
}

export function useSlideNavigation(
  slides: SlideDefinition[],
  initialSlide: number = 0
): UseSlideNavigationReturn {
  const totalSlides = slides.length;

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
  const [revealStage, setRevealStage] = useState(
    () => slides[getInitialSlide()]?.initialRevealStage ?? 0
  );

  // Refs to avoid stale closures in the keyboard listener
  const revealStageRef = useRef(0);
  revealStageRef.current = revealStage;
  const currentSlideRef = useRef(currentSlide);
  currentSlideRef.current = currentSlide;

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
      setRevealStage(slides[clampedIndex]?.initialRevealStage ?? 0);
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

  // Reveal next stage if available, otherwise advance to next slide
  const revealNext = useCallback(() => {
    const maxReveal = slides[currentSlideRef.current]?.maxRevealStages ?? 0;
    if (revealStageRef.current < maxReveal) {
      setRevealStage(prev => prev + 1);
    } else {
      nextSlide();
    }
  }, [slides, nextSlide]);

  // Roll back reveal stage if any revealed, otherwise go to previous slide
  const revealPrev = useCallback(() => {
    if (revealStageRef.current > 0) {
      setRevealStage(prev => prev - 1);
    } else {
      prevSlide();
    }
  }, [prevSlide]);

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
        case 'move':
        case 'm':
          setRevealStage(prev => prev + 1);
          return;
        case 'next':
        case 'n':
          nextSlide();
          return;
        // No default - unrecognized commands do nothing
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
          revealNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          revealPrev();
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
  }, [revealNext, revealPrev, goToSlide, totalSlides]);

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
    revealNext,
    revealPrev,
    handleCommand,
    isFirstSlide: currentSlide === 0,
    isLastSlide: currentSlide === totalSlides - 1,
    revealStage,
  };
}
