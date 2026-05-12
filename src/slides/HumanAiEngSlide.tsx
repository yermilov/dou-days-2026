import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>попри весь AI-хайп, люди залишаються <Emphasis color="orange">найбільшою цінністю</Emphasis> — зберігайте емпатію, будьте етичними та чесними</>,
  <>запровадити AI-кодинг наказом по організації <Emphasis color="green">"усі тепер використовують AI"</Emphasis> не вийде: інвестуйте в регулярні тренінги, взаємне менторство та діліться історіями успіхів і помилок</>,
  <>якщо ви менеджер — покажіть на власному прикладі й <Emphasis color="orange">створіть фічу за допомогою Claude Code</Emphasis></>,
  <>хочете, щоб люди перейшли на новий підхід — <Emphasis color="green">тимчасово знизьте очікування щодо дедлайнів</Emphasis>, щоб дати простір для навчання</>,
  <>стежте за AI-FOMO і вигоранням: AI зміщує ботлнеки з механічних задач на <Emphasis color="orange">думання головою</Emphasis></>
];

export const HumanAiEngSlide: SlideDefinition = {
  id: 'human-ai-eng',
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">людино</span>
        <span className="text-orange">центричність</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {BULLETS.map((bullet, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={i === 0 ? 0.06 : 0}>{bullet}</SlideItem>
          ) : null,
        )}
      </div>
    </>
  ),
  notes:
    "Закриваючий патерн секції про AI-first: технологія не виграє без людей. Ставка на регулярні тренінги, peer-менторинг, опініонований тулінг і простір на навчання — інакше людська інерція з'їсть будь-яку AI-стратегію. Останній буллет — головна теза: емпатія, етика, вигорання й чесні розмови залишаються базою.",
};
