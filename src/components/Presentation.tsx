import { useState, useEffect, useCallback } from 'react';
import { PresentationProps } from '../types/slides';
import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { NavigationContext } from '../context/NavigationContext';
import { useTouchNavigation } from '../hooks/useTouchNavigation';
import { Slide } from './Slide';
import { TerminalInput } from './TerminalInput';
import { SlideProgress } from './SlideProgress';
import { Timer } from './Timer';
import { OnboardingTooltip, ContextTooltip } from './OnboardingTooltip';

const TIMER_STARTED_AT_KEY = 'timerStartedAt';
const TIMER_ACCUMULATED_KEY = 'timerAccumulated';

// Tool keywords for activation persistence
const TOOL_KEYWORDS: Record<string, string[]> = {
  claude: ['claude', 'claude code', 'anthropic'],
  codex: ['codex', 'openai'],
  cursor: ['cursor'],
  amp: ['amp', 'sourcegraph'],
  gemini: ['gemini', 'gemini-cli', 'google'],
  copilot: ['copilot', 'github copilot'],
  lovable: ['lovable'],
  other: ['?', 'other', 'else', 'something'],
};

// Find which tool IDs match the input
function getMatchingToolIds(input: string): string[] {
  const normalizedInput = input.toLowerCase().trim();
  if (normalizedInput.length < 3) return [];
  return Object.entries(TOOL_KEYWORDS)
    .filter(([, keywords]) =>
      keywords.some(kw => normalizedInput.includes(kw) || kw.includes(normalizedInput))
    )
    .map(([id]) => id);
}

function getInitialTimerState(): { seconds: number; running: boolean } {
  const startedAt = localStorage.getItem(TIMER_STARTED_AT_KEY);
  const accumulated = parseInt(localStorage.getItem(TIMER_ACCUMULATED_KEY) || '0', 10);

  if (startedAt) {
    const elapsed = Math.floor((Date.now() - parseInt(startedAt, 10)) / 1000);
    return { seconds: accumulated + elapsed, running: true };
  }
  return { seconds: accumulated, running: false };
}

export function Presentation({ slides, initialSlide = 0 }: PresentationProps) {
  const { currentSlide, goToSlide, handleCommand: handleNavCommand, revealStage, nextSlide, prevSlide, revealNext, revealPrev } = useSlideNavigation(
    slides,
    initialSlide
  );

  const goToSlideById = useCallback((id: string) => {
    const index = slides.findIndex(s => s.id === id);
    if (index !== -1) goToSlide(index);
  }, [slides, goToSlide]);

  const { containerRef } = useTouchNavigation({ nextSlide, prevSlide });

  // Track current input text for interactive slides
  const [inputText, setInputText] = useState('');

  // Track activated tools (persists after Enter)
  const [activatedTools, setActivatedTools] = useState<Set<string>>(new Set());

  // Track if user has interacted on current slide (for tooltips)
  const [slideInteracted, setSlideInteracted] = useState(false);

  // Reset interaction state when slide changes
  useEffect(() => {
    setSlideInteracted(false);
  }, [currentSlide]);

  // Timer state with localStorage persistence
  const [timerSeconds, setTimerSeconds] = useState(() => getInitialTimerState().seconds);
  const [timerRunning, setTimerRunning] = useState(() => getInitialTimerState().running);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleTimerStart = useCallback(() => {
    setTimerRunning(true);
    setTimerSeconds((currentSeconds) => {
      localStorage.setItem(TIMER_STARTED_AT_KEY, Date.now().toString());
      localStorage.setItem(TIMER_ACCUMULATED_KEY, currentSeconds.toString());
      return currentSeconds;
    });
  }, []);

  // Auto-start timer when leaving slide 1; reset when returning to slide 1
  useEffect(() => {
    if (currentSlide === 0) {
      setTimerRunning(false);
      setTimerSeconds(0);
      localStorage.removeItem(TIMER_STARTED_AT_KEY);
      localStorage.removeItem(TIMER_ACCUMULATED_KEY);
    } else if (!timerRunning) {
      handleTimerStart();
    }
  }, [currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  // Command handler that activates tools and delegates navigation
  const handleCommand = useCallback((command: string) => {
    // Mark as interacted (hides tooltips)
    setSlideInteracted(true);

    // Only activate tools when on the IntroSlide
    if (slides[currentSlide]?.id === 'intro') {
      const matchingTools = getMatchingToolIds(command);
      if (matchingTools.length > 0) {
        setActivatedTools(prev => {
          const next = new Set(prev);
          matchingTools.forEach(id => next.add(id));
          return next;
        });
      }
    }

    handleNavCommand(command);
  }, [handleNavCommand]);

  const activeSlide = slides[currentSlide];

  if (!activeSlide) {
    return null;
  }

  const slideContent =
    typeof activeSlide.content === 'function'
      ? activeSlide.content({ revealStage, inputText, activatedTools })
      : activeSlide.content;

  return (
    <NavigationContext.Provider value={{ goToSlideById }}>
    <div className="presentation">
      {/* key={activeSlide.id} is load-bearing: it remounts the whole slide
          tree on navigation so SonarPattern re-rolls its random image +
          framing per visit. See .claude/skills/design-system/references/cohesive-chrome.md */}
      <div
        className={`slide-container${activeSlide.chrome && activeSlide.chrome !== 'none' ? ' slide-container--staged' : ''}${activeSlide.chrome === 'hero' || activeSlide.hero ? ' slide-container--hero' : ''}`}
        ref={containerRef}
        key={activeSlide.id}
      >
        <Slide
          isActive
          notes={activeSlide.notes}
          background={activeSlide.background}
          chrome={activeSlide.chrome ?? (activeSlide.hero ? 'hero' : 'global')}
        >
          {slideContent}
        </Slide>
      </div>
      {currentSlide === 0 && !slideInteracted && activeSlide.chrome !== 'hero' && !activeSlide.hero && <OnboardingTooltip />}
      {activeSlide.tooltip &&
        (activeSlide.maxRevealStages
          ? revealStage < activeSlide.maxRevealStages
          : !slideInteracted) && (
        <ContextTooltip>{activeSlide.tooltip}</ContextTooltip>
      )}
      <div className="input-bar">
        <Timer
          elapsedSeconds={timerSeconds}
          currentSlide={currentSlide}
          totalSlides={slides.length}
        />
        <TerminalInput
          onCommand={handleCommand}
          onInputChange={setInputText}
          onArrowLeft={revealPrev}
          onArrowRight={revealNext}
          placeholder="type anything to continue, 'prev' to go back, or slide number..."
        />
        {/* Show context progress once less than 50% of slides remain */}
        {(currentSlide + 1) / slides.length > 0.5 && (
          <SlideProgress
            current={currentSlide + 1}
            total={slides.length}
            isFirst={currentSlide === Math.floor(slides.length / 2)}
          />
        )}
      </div>
    </div>
    </NavigationContext.Provider>
  );
}
