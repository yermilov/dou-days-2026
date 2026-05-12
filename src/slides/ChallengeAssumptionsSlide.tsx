import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const QUESTIONS: ReactNode[] = [
  <>якщо ми релізимо фічі у 10 разів швидше — чи встигатимемо ми так само швидко <Emphasis color="orange">ухвалювати рішення</Emphasis>?</>,
  <>чи потрібно тижнями писати й обговорювати дизайн-доки, якщо <Emphasis color="green">прототип</Emphasis> можна запустити швидше, ніж пишеться документ про нього?</>,
  <>чи можемо ми обміняти частину <Emphasis color="green">стандартів аптайму</Emphasis> на швидкість розробки?</>,
  <>чи варто оцінювати <Emphasis color="orange">AI-кодинг скіли</Emphasis> на технічних інтерв'ю?</>
];

export const ChallengeAssumptionsSlide: SlideDefinition = {
  id: 'challenge-assumptions',
  content: ({ revealStage }) => (
    <>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">складні</span>{' '}
        <span className="text-orange">питання</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {QUESTIONS.map((q, i) =>
          revealStage >= i ? (
            <SlideItem key={i} delay={i === 0 ? 0.06 : 0}>{q}</SlideItem>
          ) : null,
        )}
      </div>
    </>
  ),
  maxRevealStages: QUESTIONS.length - 1,
  notes:
    "Закриваюча секція AI-first: ці питання — не риторичні. Кожне з них — командна розмова, яка чекає, коли її почнуть. Запропонуйте слухачам обрати два питання, що найбільше змінять їхню організацію, і починати з них.",
};
