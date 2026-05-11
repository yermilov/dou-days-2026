import { ReactNode } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

const BULLETS: ReactNode[] = [
  <>не дивлячись на AI-психоз, люди завжди залишаються вашим <Emphasis color="orange">найважливішим активом</Emphasis> - зберігайте емпатію, будьте етичними та залишайтеся чесними</>,
  <>насадити AI-кодинг наказом по організації <Emphasis color="green">"всі використовують АІ"</Emphasis> не вийде: інвестуйте в регулярні тренінги, peer-менторинг, підвсічуйте історії перемог і поразок</>,
  <>якщо ви менеджер - покажіть власним прикладом і <Emphasis color="orange">зробіть фічу за допомогою клод коду</Emphasis></>,
  <>хочете щоб люди перейшли на новий шлях - <Emphasis color="green">зменшіть тимчасово очікування по дедлайнах</Emphasis>, щоб дати простір для навчання</>,
  <>стежте за вигоранням: АІ змушує людей <Emphasis color="orange">працювати більше</Emphasis>, по ночах і вихідних, в метро з телефону</>
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
