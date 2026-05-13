import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import linkedinQr from '../assets/linkedin-qr.jpeg?url';

const TAKEAWAYS: ReactNode[] = [
  <>почніть із пошуку власного <Emphasis color="green">vibe coding flow</Emphasis></>,
  <>далі виходьте за межі коду — використовуйте Клода для <Emphasis color="orange">всього, що робите</Emphasis>, особливо для закриття feedback loops</>,
  <>скіли — ваш мультиплікатор для команди; побудуйте <Emphasis color="green">інфраструктуру</Emphasis>, щоб ними було легко ділитися й перевикористовувати</>,
  <>напівавтономні агенти — наступний рубіж; починайте зі <Emphasis color="orange">спеціалізованих агентів</Emphasis>: тріажу тікетів, код-рев'ю, міграцій тощо</>,
  <><Emphasis color="green">люди</Emphasis> — найбільша цінність: AI підсилює команду, а не замінює її</>,
];

const LINKEDIN_BULLET: ReactNode = (
  <>пишіть мені в LinkedIn, я люблю поспілкуватися про AI</>
);

// One extra reveal stage after the 5 takeaways for the LinkedIn bullet + QR
// pair on the right column.
const TOTAL_STAGES = TAKEAWAYS.length + 1;

export const FinalSlide: SlideDefinition = {
  id: 'final',
  content: ({ revealStage }) => (
    <>
      <h2 className="final-slide__heading">
        compacting the conversation...
      </h2>

      <div className="final-slide">
        <div className="final-slide__bullets">
          {TAKEAWAYS.map((bullet, i) =>
            revealStage >= i + 1 ? (
              <SlideItem key={i} delay={0}>{bullet}</SlideItem>
            ) : null,
          )}
        </div>

        {revealStage >= TOTAL_STAGES && (
          <div className="final-slide__contact">
            <SlideItem delay={0}>{LINKEDIN_BULLET}</SlideItem>
            <img
              className="final-slide__qr final-qr-reveal"
              src={linkedinQr}
              alt="LinkedIn QR code - Yarik Yermilov"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  ),
  maxRevealStages: TOTAL_STAGES,
  notes:
    "Фінальні висновки: vibe flow як фундамент, Клод поза кодом, інфраструктура для skills, спеціалізовані агенти, люди — найбільша цінність. На фінальній стадії — права колонка з реплікою про LinkedIn та QR-код одразу під нею.",
};
