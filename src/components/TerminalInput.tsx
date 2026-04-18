import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { TerminalInputProps } from '../types/slides';

export function TerminalInput({
  onCommand,
  onInputChange,
  onArrowLeft,
  onArrowRight,
  placeholder = 'type a command...',
  disabled = false,
}: TerminalInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect mobile touch device — skip auto-focus to prevent on-screen keyboard
  const isMobileTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px) and (pointer: coarse)').matches;

  // Auto-focus on mount (skip on mobile to prevent keyboard opening)
  useEffect(() => {
    if (inputRef.current && !disabled && !isMobileTouch) {
      inputRef.current.focus();
    }
  }, [disabled, isMobileTouch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputChange?.(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onCommand(value);
      setValue('');
      onInputChange?.('');
      return;
    }

    // Arrow key navigation when input is empty
    if (!value) {
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && onArrowLeft) {
        e.preventDefault();
        onArrowLeft();
        return;
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && onArrowRight) {
        e.preventDefault();
        onArrowRight();
        return;
      }
    }
  };

  // Re-focus input when clicking anywhere in the presentation (skip on mobile)
  useEffect(() => {
    if (isMobileTouch) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Don't steal focus if user has selected text
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }

      // Don't steal focus from code blocks or other interactive elements
      if (
        target.tagName !== 'A' &&
        target.tagName !== 'BUTTON' &&
        !target.closest('.code-block') &&
        inputRef.current &&
        !disabled
      ) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [disabled, isMobileTouch]);

  return (
    <div className="terminal-input">
      <div className="terminal-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="terminal-input-field"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Slide command input"
        />
      </div>
    </div>
  );
}
