import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';

// Section header with animation for this slide
function AnimatedSectionHeader({
  children,
  color,
  delay,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
  delay: number;
}) {
  return (
    <div
      className={`section-header section-header--${color}`}
      style={{
        opacity: 0,
        animation: 'slideItemFadeIn 0.35s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      {'// '}
      {children}
    </div>
  );
}

export const LifeAfterCommitSlide: SlideDefinition = {
  id: 'life-after-commit',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">deploy</span>{' '}
        <span className="text-orange">--aftercare</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <AnimatedSectionHeader color="green" delay={0.03}>
          logging
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          попросіть клод додавати багато логів і поясніть як отримати до них
          доступ (в <Code>CLAUDE.md</Code>)
        </SlideItem>

        <SlideItem delay={0.14}>
          якщо запускаєте локально — вкажіть де лежить лог файл
        </SlideItem>

        <SlideItem delay={0.20}>
          якщо в клауді — налаштуйте відправку логів в{' '}
          <SlideLink href="https://betterstack.com/">betterstack.com</SlideLink> і
          налаштуйте <Code>cli</Code> щоб мати до них доступ
        </SlideItem>

        <AnimatedSectionHeader color="purple" delay={0.26}>
          web testing
        </AnimatedSectionHeader>

        <SlideItem delay={0.32}>
          встановіть хром плагін{' '}
          <SlideLink href="https://claude.com/chrome">claude.com/chrome</SlideLink> і
          налаштуйте його за допомогою <Code>/chrome</Code>
        </SlideItem>

        <SlideItem delay={0.38}>
          поясніть клод як "проклацати ваш сервіс" щоб він міг його потестувати
          (в <Code>CLAUDE.md</Code>)
        </SlideItem>

        <AnimatedSectionHeader color="blue" delay={0.44}>
          mcp
        </AnimatedSectionHeader>

        <SlideItem delay={0.50}>
          <SlideLink href="https://github.com/anthropics/anthropic-quickstarts/tree/main/mcp-chrome-devtools">
            chrome-devtools-mcp
          </SlideLink>{' '}
          — мабуть найбільш корисний <Code>MCP</Code> сервер зараз, але і він
          має свої обмеження
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Life after commit - logging setup (local vs cloud with BetterStack), web testing with Chrome plugin and /chrome command, MCP Chrome DevTools server',
};
