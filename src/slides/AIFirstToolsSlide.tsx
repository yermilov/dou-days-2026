import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

// Section header with animation
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

// Tool tag styling
function Tool({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--terminal-cyan)',
        backgroundColor: 'rgba(118, 228, 247, 0.1)',
        padding: '0.1em 0.4em',
        borderRadius: '4px',
        fontSize: '0.9em',
      }}
    >
      {children}
    </span>
  );
}

export const AIFirstToolsSlide: SlideDefinition = {
  id: 'ai-first-tools',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">mindset</span>{' '}
        <span className="text-orange">--tools</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <AnimatedSectionHeader color="blue" delay={0.03}>
          інструменти
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          організуйте клод доступ до усіх можливих інструментів, описавши в
          скілах як з ними працювати:
        </SlideItem>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginLeft: '2rem',
            marginBottom: '1.5rem',
            opacity: 0,
            animation: 'slideItemFadeIn 0.35s ease-out forwards',
            animationDelay: '0.14s',
          }}
        >
          <Tool>chatgpt</Tool>
          <Tool>codex</Tool>
          <Tool>logs</Tool>
          <Tool>metrics</Tool>
          <Tool>nano banana</Tool>
          <Tool>figma</Tool>
          <Tool>deep research</Tool>
          <Tool>bug reports</Tool>
          <Tool>cost tracking</Tool>
          <Tool>...</Tool>
        </div>

        <AnimatedSectionHeader color="green" delay={0.20}>
          ваша місія
        </AnimatedSectionHeader>

        <SlideItem delay={0.26}>
          ваша задача — <Emphasis color="orange">генерувати продуктові ідеї</Emphasis>{' '}
          і описувати їх для клода
        </SlideItem>

        <SlideItem delay={0.32}>
          і організувати все таким чином щоб{' '}
          <Emphasis color="green">клод вже далі сам без вас</Emphasis>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'AI-First tools integration - give Claude access to all possible tools via skills (chatgpt, codex, logs, metrics, figma, etc.). Your mission: generate product ideas and describe them for Claude, organize so Claude can work independently.',
};
