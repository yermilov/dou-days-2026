import { SlideDefinition } from '../types/slides';

export const ClaudeCodeSlide: SlideDefinition = {
  id: 'claude-code',
  maxRevealStages: 2,
  tooltip: (
    <>
      <div className="onboarding-tooltip-header">
        <span className="onboarding-tooltip-icon">?</span>
        <span className="onboarding-tooltip-title">Hint</span>
      </div>
      <ul className="onboarding-tooltip-list">
        <li>
          <code>reveal</code> or <code>r</code> — Reveal next
        </li>
      </ul>
    </>
  ),
  content: ({ revealStage }) => (
    <>
      <h2>what a great service for creating slides?</h2>
      {revealStage >= 1 && <h1 className="hero">Claude Code!</h1>}
      {revealStage >= 2 && (
        <div className="claude-code-reveal">
          <div className="reveal-repo">
            <span className="reveal-prompt">$</span>
            <a
              href="https://github.com/yermilov/ai-first-transformation-from-within-en"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/yermilov/ai-first-transformation-from-within-en
            </a>
          </div>
          <p className="reveal-intro">I open Claude Code and give it tasks</p>
          <ul className="reveal-list">
            <li style={{ animationDelay: '0.1s' }}>build static web site from scratch using Bun + React stack</li>
            <li style={{ animationDelay: '0.2s' }}>research internet for materials</li>
            <li style={{ animationDelay: '0.3s' }}>compose slide ideas</li>
            <li style={{ animationDelay: '0.4s' }}>design layouts, aesthetics</li>
            <li style={{ animationDelay: '0.5s' }}>find and download images</li>
            <li style={{ animationDelay: '0.6s' }}>create interactive slides</li>
            <li style={{ animationDelay: '0.7s' }}>generate images using Nano Banana Pro</li>
          </ul>
        </div>
      )}
    </>
  ),
};
