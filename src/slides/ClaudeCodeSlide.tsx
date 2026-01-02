import { SlideDefinition } from '../types/slides';

export const ClaudeCodeSlide: SlideDefinition = {
  id: 'claude-code',
  content: ({ revealed }) => (
    <>
      <h2>що за класний сервіс для створення слайдів?</h2>
      {revealed && <h1 className="hero">Claude Code!</h1>}
    </>
  ),
};
