import { SlideDefinition } from '../types/slides';

export const ClaudeCodeSlide: SlideDefinition = {
  id: 'claude-code',
  maxRevealStages: 2,
  tooltip: (
    <>
      <div className="onboarding-tooltip-header">
        <span className="onboarding-tooltip-icon">?</span>
        <span className="onboarding-tooltip-title">Підказка</span>
      </div>
      <ul className="onboarding-tooltip-list">
        <li>
          <code>reveal</code> або <code>r</code> — Показати далі
        </li>
      </ul>
    </>
  ),
  content: ({ revealStage }) => (
    <>
      <h2>що за класний сервіс для створення слайдів?</h2>
      {revealStage >= 1 && <h1 className="hero">Claude Code!</h1>}
      {revealStage >= 2 && (
        <div className="claude-code-reveal">
          <div className="reveal-repo">
            <span className="reveal-prompt">$</span>
            <a
              href="https://github.com/yermilov/pragmatic-vibe-clauding-ua"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/yermilov/pragmatic-vibe-clauding-ua
            </a>
          </div>
          <p className="reveal-intro">відкриваю Claude Code і даю йому задачі</p>
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
