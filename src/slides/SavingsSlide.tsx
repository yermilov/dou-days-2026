import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, SlideLink } from '../components/SlideElements';

// Price styling (green) - money highlight
function Price({ children }: { children: string }) {
  return (
    <span className="text-emphasis text-emphasis--green">
      {children}
    </span>
  );
}

// Dimmed parenthetical text
function Dim({ children }: { children: string }) {
  return (
    <span style={{ color: 'var(--terminal-white-muted)', fontSize: '0.9em' }}>
      ({children})
    </span>
  );
}

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

export const SavingsSlide: SlideDefinition = {
  id: 'savings',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">budget</span>{' '}
        <span className="text-orange">--optimize</span>
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
          pricing tiers
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          антропік видає певну кількість токенів на 5 годин — і зупинить вас як
          тільки ви їх використаєте
        </SlideItem>

        <SlideItem delay={0.14}>
          з мого досвіду: <Price>$17</Price> — 1-1.5 години вайб-кодінгу,{' '}
          <Price>$100</Price> — 3-4 години, <Price>$200</Price> — повні 5 годин
        </SlideItem>

        <SlideItem delay={0.20}>
          <Price>$100</Price> — sweet spot, але гроші немаленькі; якщо ви багаті — купіть{' '}
          <Price>$200</Price> або <Price>$100</Price> + один-два на{' '}
          <Price>$17</Price>
        </SlideItem>

        <AnimatedSectionHeader color="purple" delay={0.26}>
          якщо ви не багачі
        </AnimatedSectionHeader>

        <SlideItem delay={0.32}>
          оформіть <Price>$20</Price> підписку на ChatGPT (можливо вона у вас вже є) і встановіть{' '}
          <Code>codex cli</Code>
        </SlideItem>

        <SlideItem delay={0.38}>
          <Code>codex</Code> — клон клод кода: він погано працює в довгих сесіях, але добре
          ван-шотить майже робочі стаби
        </SlideItem>

        <SlideItem delay={0.44}>
          стратегія: ван-шот в <Code>codex</Code> → переходьте в{' '}
          <Code>claude code</Code> і попередьте його що стаб вже готовий
        </SlideItem>

        <AnimatedSectionHeader color="blue" delay={0.50}>
          ще дешевші варіанти
        </AnimatedSectionHeader>

        <SlideItem delay={0.56}>
          <Dim>перевірено</Dim> тріал <Code>Cursor</Code> — IDE або{' '}
          <Code>cursor-cli</Code>
        </SlideItem>

        <SlideItem delay={0.62}>
          <Dim>не перевірено</Dim>{' '}
          <SlideLink href="https://ampcode.com/free">ampcode.com/free</SlideLink> —
          безкоштовний клон з рейт лімітом і рекламою (не жарт)
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Budget optimization - pricing tiers ($17/1-1.5h, $100/3.5-4h sweet spot, $200/5h full), Codex CLI alternative with one-shot strategy, Cursor trial, Ampcode free option',
};
