import { Presentation } from './components/Presentation';
import { CodeBlock } from './components/CodeBlock';
import { SlideDefinition } from './types/slides';
import './styles/theme.css';
import './styles/terminal.css';

const slides: SlideDefinition[] = [
  {
    id: 'intro',
    content: (
      <>
        <h1 className="hero">Прагматичний вайб клодінг</h1>
        <p>Ярослав Єрмілов, Principal Software Engineer @ Superhuman/Grammarly</p>
      </>
    ),
    notes: 'Welcome everyone to this presentation about Claude Code!',
  },
  {
    id: 'navigation',
    content: (
      <>
        <h2>Navigation</h2>
        <ul>
          <li>Type <code>next</code> or <em>any text</em> to advance</li>
          <li>Type <code>prev</code> or <code>back</code> to go back</li>
          <li>Type a <em>number</em> to jump to that slide</li>
          <li>Use <em>arrow keys</em> when not typing</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-is-claude-code',
    content: (
      <>
        <h2>What is Claude Code?</h2>
        <p>An agentic coding tool that lives in your terminal</p>
        <p className="text-dim">Understand, modify, and execute code autonomously</p>
      </>
    ),
  },
  {
    id: 'installation',
    content: (
      <>
        <h2>Getting Started</h2>
        <CodeBlock
          language="bash"
          filename="terminal"
          code={`# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Start Claude Code in your project
claude`}
        />
      </>
    ),
  },
  {
    id: 'features',
    content: (
      <>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Agentic</strong> — works autonomously on complex tasks</li>
          <li><strong>Context-aware</strong> — understands your entire codebase</li>
          <li><strong>Tool use</strong> — reads, writes, and executes code</li>
          <li><strong>Safe</strong> — asks permission before changes</li>
        </ul>
      </>
    ),
  },
  {
    id: 'code-example',
    content: (
      <>
        <h2>Example Workflow</h2>
        <CodeBlock
          language="typescript"
          filename="example.ts"
          showLineNumbers
          code={`// Claude Code can understand and modify
// your code with natural language

const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};

// Ask: "Add error handling for empty names"
// Claude will update the code automatically`}
        />
      </>
    ),
  },
  {
    id: 'thanks',
    content: (
      <>
        <h1>Thank You!</h1>
        <p>Happy coding with Claude</p>
        <p className="text-muted">github.com/anthropics/claude-code</p>
      </>
    ),
  },
];

export default function App() {
  return <Presentation slides={slides} />;
}
