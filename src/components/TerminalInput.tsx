import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { TerminalInputProps } from '../types/slides';

export function TerminalInput({
  onCommand,
  onInputChange,
  placeholder = 'type a command...',
  disabled = false,
}: TerminalInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

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
    }
  };

  // Re-focus input when clicking anywhere in the presentation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
  }, [disabled]);

  return (
    <div className="terminal-input">
      <div className="terminal-input-wrapper">
        <span className="terminal-input-prompt">&gt;</span>
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
        />
      </div>
    </div>
  );
}
