import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

const TAKEAWAYS: ReactNode[] = [
  <>почніть із пошуку власного <Emphasis color="green">vibe flow</Emphasis></>,
  <>вийдіть за межі коду — використовуйте Claude для <Emphasis color="orange">всього, що робите</Emphasis>, особливо для закриття feedback loops</>,
  <>skills — це множник для команди; побудуйте <Emphasis color="green">інфраструктуру</Emphasis>, щоб ними було легко ділитися й перевикористовувати</>,
  <>напівавтономні агенти — наступний рубіж; починайте зі <Emphasis color="orange">спеціалізованих агентів</Emphasis>: тріаж тікетів, код-рев'ю, міграції, …</>,
  <><Emphasis color="green">люди</Emphasis> — найважливіша частина: AI підсилює команду, а не замінює її</>,
  <>давайте знайомитися в LinkedIn <span className="final-slide__arrow">→</span></>,
];

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

        {revealStage >= TAKEAWAYS.length && (
          <img
            className="final-slide__qr final-qr-reveal"
            src={linkedinQr}
            alt="LinkedIn QR code - Yarik Yermilov"
            loading="lazy"
          />
        )}
      </div>
    </>
  ),
  maxRevealStages: TAKEAWAYS.length,
  notes:
    "Фінальні висновки: vibe flow як фундамент, Claude поза кодом, інфраструктура для skills, спеціалізовані агенти, люди — найважливіша частина, знайомимось у LinkedIn. QR-код з'являється разом із останнім пунктом.",
};
