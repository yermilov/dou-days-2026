import { SlideDefinition, SlideContentProps } from '../types/slides';

// Logo configuration with keywords for activation
const BASE_URL = import.meta.env.BASE_URL;

const AI_TOOLS = [
  {
    id: 'claude',
    name: 'Claude Code',
    url: `${BASE_URL}logos/claude.svg`,
    keywords: ['claude', 'claude code', 'anthropic'],
  },
  {
    id: 'codex',
    name: 'Codex',
    url: `${BASE_URL}logos/openai.svg`,
    keywords: ['codex', 'openai'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    url: `${BASE_URL}logos/cursor.svg`,
    keywords: ['cursor'],
  },
  {
    id: 'amp',
    name: 'Amp',
    url: `${BASE_URL}logos/sourcegraph.svg`,
    keywords: ['amp', 'sourcegraph'],
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    url: `${BASE_URL}logos/gemini.svg`,
    keywords: ['gemini', 'gemini-cli', 'google'],
  },
  {
    id: 'copilot',
    name: 'Copilot',
    url: `${BASE_URL}logos/github-copilot.svg`,
    keywords: ['copilot', 'github copilot'],
  },
  {
    id: 'lovable',
    name: 'Lovable',
    url: `${BASE_URL}logos/lovable.svg`,
    keywords: ['lovable'],
  },
];

// Check if tool is active (only after Enter press, stored in activatedTools)
function isToolActive(
  tool: typeof AI_TOOLS[0],
  activatedTools: Set<string>
): boolean {
  return activatedTools.has(tool.id);
}

// Check if question mark should be active (only after Enter press)
function isQuestionMarkActive(activatedTools: Set<string>): boolean {
  return activatedTools.has('other');
}

export const IntroSlide: SlideDefinition = {
  id: 'intro',
  tooltip: (
    <>
      <div className="onboarding-tooltip-header">
        <span className="onboarding-tooltip-icon">?</span>
        <span className="onboarding-tooltip-title">Підказка</span>
      </div>
      <ul className="onboarding-tooltip-list">
        <li>
          введіть назву інструменту, щоб підсвітити
        </li>
      </ul>
    </>
  ),
  content: ({ activatedTools }: SlideContentProps) => (
    <>
      <h2>давайте знайомитися з вами</h2>
      <h1 className="hero">розкажіть про свій досвід ai кодінгу</h1>

      <div className="tool-grid">
        {AI_TOOLS.map((tool, index) => (
          <div
            key={tool.id}
            className={`tool-item ${isToolActive(tool, activatedTools) ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="tool-logo-wrapper">
              <img
                src={tool.url}
                alt={tool.name}
                className="tool-logo"
                loading="lazy"
              />
              <div className="tool-glow" />
            </div>
            <span className="tool-name">{tool.name}</span>
          </div>
        ))}

        {/* Question mark for "something else" */}
        <div
          className={`tool-item ${isQuestionMarkActive(activatedTools) ? 'active' : ''}`}
          style={{ animationDelay: `${AI_TOOLS.length * 0.08}s` }}
        >
          <div className="tool-logo-wrapper">
            <svg
              className="tool-logo question-mark-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.3101 14.1402 11.4227 12.9581 11.8292C12.4021 12.0211 12 12.4477 12 13V14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="17.5"
                r="1"
                fill="currentColor"
              />
            </svg>
            <div className="tool-glow" />
          </div>
          <span className="tool-name">???</span>
        </div>
      </div>
    </>
  ),
};
