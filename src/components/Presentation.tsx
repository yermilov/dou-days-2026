import { useState, useEffect, useCallback } from 'react';
import { PresentationProps } from '../types/slides';
import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { Slide } from './Slide';
import { TerminalInput } from './TerminalInput';
import { SlideProgress } from './SlideProgress';
import { Timer } from './Timer';

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
  if (!input.trim()) return [];
  const normalizedInput = input.toLowerCase().trim();
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
  const { currentSlide, handleCommand: handleNavCommand, revealStage } = useSlideNavigation(
    slides.length,
    initialSlide
  );

  // Track current input text for interactive slides
  const [inputText, setInputText] = useState('');

  // Track activated tools (persists after Enter)
  const [activatedTools, setActivatedTools] = useState<Set<string>>(new Set());

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

  const handleTimerPause = useCallback(() => {
    setTimerRunning(false);
    setTimerSeconds((currentSeconds) => {
      localStorage.removeItem(TIMER_STARTED_AT_KEY);
      localStorage.setItem(TIMER_ACCUMULATED_KEY, currentSeconds.toString());
      return currentSeconds;
    });
  }, []);

  const handleTimerStartPause = useCallback(() => {
    setTimerRunning((running) => {
      if (running) {
        // Pausing
        setTimerSeconds((currentSeconds) => {
          localStorage.removeItem(TIMER_STARTED_AT_KEY);
          localStorage.setItem(TIMER_ACCUMULATED_KEY, currentSeconds.toString());
          return currentSeconds;
        });
      } else {
        // Starting
        setTimerSeconds((currentSeconds) => {
          localStorage.setItem(TIMER_STARTED_AT_KEY, Date.now().toString());
          localStorage.setItem(TIMER_ACCUMULATED_KEY, currentSeconds.toString());
          return currentSeconds;
        });
      }
      return !running;
    });
  }, []);

  const handleTimerReset = useCallback(() => {
    setTimerRunning(false);
    setTimerSeconds(0);
    localStorage.removeItem(TIMER_STARTED_AT_KEY);
    localStorage.removeItem(TIMER_ACCUMULATED_KEY);
  }, []);

  // Command handler that intercepts timer commands and activates tools
  const handleCommand = useCallback((command: string) => {
    const trimmed = command.trim().toLowerCase();

    // Check for tool activation before other commands
    const matchingTools = getMatchingToolIds(command);
    if (matchingTools.length > 0) {
      setActivatedTools(prev => {
        const next = new Set(prev);
        matchingTools.forEach(id => next.add(id));
        return next;
      });
    }

    switch (trimmed) {
      case 'start':
      case 'go':
        handleTimerStart();
        return;
      case 'pause':
      case 'stop':
        handleTimerPause();
        return;
      case 'reset':
        handleTimerReset();
        return;
      default:
        handleNavCommand(command);
    }
  }, [handleNavCommand, handleTimerStart, handleTimerPause, handleTimerReset]);

  const activeSlide = slides[currentSlide];

  if (!activeSlide) {
    return null;
  }

  const slideContent =
    typeof activeSlide.content === 'function'
      ? activeSlide.content({ revealStage, inputText, activatedTools })
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
      <Timer
        seconds={timerSeconds}
        isRunning={timerRunning}
        onStartPause={handleTimerStartPause}
        onReset={handleTimerReset}
      />
      <SlideProgress current={currentSlide + 1} total={slides.length} />
      <TerminalInput
        onCommand={handleCommand}
        onInputChange={setInputText}
        placeholder="type anything to continue, 'prev' to go back, or slide number..."
      />
    </div>
  );
}
