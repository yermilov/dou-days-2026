import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';
import mcpToolCallFlow from '/mcp-tool-call-flow.png?url';
import mcpContextPollution from '/mcp-context-pollution.png?url';

export const McpSlide: SlideDefinition = {
  id: 'mcp',
  content: (
    <div className="mcp-slide">
      <img
        src={mcpToolCallFlow}
        alt="LLM tool call token flow"
        className="mcp-slide-image-left"
      />

      <div className="mcp-slide-content">
        <h2 style={{ marginBottom: '2rem' }}>
          <span className="text-dim">$</span>{' '}
          <span className="text-green">mcp</span>{' '}
          <span className="text-orange">--list</span>
        </h2>

        <SlideItem delay={0.05}>
          <Code>MCP</Code> (Model Context Protocol) — хайповий стандарт інтеграції
          LLM-застосунків з інструментами
        </SlideItem>

        <SlideItem delay={0.1}>
          <Code>tool</Code> — спосіб дозволити LLM виконувати дії, а не лише
          генерувати текст
        </SlideItem>

        <SlideItem delay={0.15}>
          але насправді MCP - доволі контроверсійна технологія оскільки вона має багато проблем і обмежень
        </SlideItem>

        <SlideItem delay={0.2}>
          для Claude Desktop чи ChatGPT альтернатив їй немає, а от для Claude Code варто завжди в першу чергу використовувати CLI
        </SlideItem>

        <SlideItem delay={0.25}>
          приклад: замість GitHub MCP використовуйте gh cli
        </SlideItem>

        <SlideItem delay={0.3}>
          єдиний MCP сервер який майже без вагань можу порекомендувати - це{' '}
          <SlideLink href="https://github.com/ChromeDevTools/chrome-devtools-mcp">
            chrome-devtools-mcp
          </SlideLink>
        </SlideItem>

        <SlideItem delay={0.35}>
          не забувайте підказувати клоду що ви би хотіли щоб він використав певний MCP
        </SlideItem>
      </div>

      <img
        src={mcpContextPollution}
        alt="MCP context window pollution"
        className="mcp-slide-image-right"
      />
    </div>
  ),
  notes: 'MCP servers overview - what they are, how to use them, and current recommendations',
};
