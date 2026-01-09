import { SlideDefinition } from '../types/slides';
import { Code, SlideItem, Emphasis } from '../components/SlideElements';

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

export const AIFirstRoleSlide: SlideDefinition = {
  id: 'ai-first-role',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">mindset</span>{' '}
        <span className="text-orange">--ai-first</span>
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
          ваша роль
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          думайте про себе більше як про{' '}
          <Emphasis color="orange">продакт овнера</Emphasis>,{' '}
          <Emphasis color="orange">техліда</Emphasis>,{' '}
          <Emphasis color="orange">архітектора</Emphasis>
        </SlideItem>

        <SlideItem delay={0.14}>
          замість найму інженерів в команду, ви наймаєте{' '}
          <Emphasis color="green">клод код</Emphasis>
        </SlideItem>

        <SlideItem delay={0.20}>
          створюйте умови для того щоб клод коду було максимально комфортно
          працювати над задачами які ви йому даєте, а вам було максимально
          комфортно задачі давати і контролювати їх виконання
        </SlideItem>

        <AnimatedSectionHeader color="purple" delay={0.26}>
          як працювати
        </AnimatedSectionHeader>

        <SlideItem delay={0.32}>
          використовуйте <Emphasis color="green">GitHub issues</Emphasis> для
          постановки задач замість промптів, просто пишіть{' '}
          <Code variant="orange">please work on github issue #...</Code>,
          звичайно ж зробіть скіл
        </SlideItem>

        <SlideItem delay={0.38}>
          зберігайте всю документацію, яка може змінюватися з часом, в
          спеціальній папці всередині вашої монорепи, звичайно ж зробіть скіл
        </SlideItem>

        <SlideItem delay={0.44}>
          зберігайте більш фундаментальні незмінні знання в скілах
        </SlideItem>

        <SlideItem delay={0.50}>
          найбільш фундаментальні принципи роботи (фактично ваш контракт з
          клодом) опишіть в <Code>CLAUDE.md</Code>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'AI-First Engineering mindset - think of yourself as product owner/tech lead/architect, hire Claude Code instead of engineers, create comfortable conditions for Claude to work',
};
