import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>найскладніше в Human+AI інженерії — це <Emphasis color="orange">люди</Emphasis>: насадити AI-кодинг наказом не вийде, людська інерція реальна</>,
  <>не залишайте інженерів сам на сам: інвестуйте в <Emphasis color="green">регулярні тренінги, peer-менторинг, опініонований тулінг, office hours та історії перемог і поразок</Emphasis></>,
  <>відомий біль — інженерам нема де подихнути, щоб пройти криву навчання — спробуйте на старті <Emphasis color="orange">зменшити очікування по дедлайнах</Emphasis>, щоб дати простір для навчання, а потім підняти їх вище ніж було</>,
  <>люди завжди залишаються вашим <Emphasis color="orange">найважливішим активом</Emphasis> — зберігайте емпатію, будьте етичними, стежте за вигоранням, ведіть чесні розмови</>,
];

export const HumanAiEngSlide: SlideDefinition = {
  id: 'human-ai-eng',
  maxRevealStages: BULLETS.length - 1,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--людиноцентричність</span>
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
