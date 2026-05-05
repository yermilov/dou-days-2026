import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const QUESTIONS: ReactNode[] = [
  <>якщо ми постачатимемо в 2–10 разів швидше — чи встигатимемо так само швидко <Emphasis color="orange">приймати рішення</Emphasis>?</>,
  <>чи потрібні тижні на дизайн-доки, якщо <Emphasis color="green">прототип</Emphasis> збирається швидше, ніж пишеться документ про нього?</>,
  <>чи треба <Emphasis color="orange">планувати кварталами</Emphasis>, якщо фічу можна випустити за два тижні після ідеї і отримати фідбек ще за місяць?</>,
  <>чи можемо обміняти частину <Emphasis color="orange">стандартів аптайму</Emphasis> на швидкість розробки?</>,
  <>чи можна послабити <Emphasis color="green">жорсткі стандарти код-рев'ю</Emphasis>, щоб AI допомагав із рев'ю?</>,
  <>чи варто оцінювати <Emphasis color="orange">AI-кодинг скіли</Emphasis> на технічних інтерв'ю?</>,
  <>які обговорення <Emphasis color="orange">втратили сенс</Emphasis>, коли генерація коду стає копійчаною — чи потрібна архітектура, якщо код можна щотижня перегенерувати з нуля?</>,
];

export const ChallengeAssumptionsSlide: SlideDefinition = {
  id: 'challenge-assumptions',
  content: ({ revealStage }) => (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--переглядаємо-припущення</span>
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
