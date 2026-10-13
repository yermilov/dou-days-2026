import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import type { Lang } from '../context/LanguageContext';
import { SlideItem, Emphasis } from '../components/SlideElements';
import linkedinQr from '../assets/linkedin-qr.jpeg?url';

const TAKEAWAYS: Record<Lang, ReactNode[]> = {
  uk: [
  <>почніть із пошуку власного <Emphasis color="green">vibe coding flow</Emphasis></>,
  <>далі виходьте за межі коду — використовуйте Клода для <Emphasis color="orange">всього, що робите</Emphasis>, особливо для закриття feedback loops</>,
  <>скіли — ваш мультиплікатор для команди; побудуйте <Emphasis color="green">інфраструктуру</Emphasis>, щоб ними було легко ділитися й перевикористовувати</>,
  <>напівавтономні агенти — наступний рубіж; починайте зі <Emphasis color="orange">спеціалізованих агентів</Emphasis>: тріажу тікетів, код-рев'ю, міграцій тощо</>,
  <><Emphasis color="green">люди</Emphasis> — найбільша цінність: AI підсилює команду, а не замінює її</>,
  ],
  en: [
  <>start by finding your own <Emphasis color="green">vibe coding flow</Emphasis></>,
  <>then go beyond code — use Claude for <Emphasis color="orange">everything you do</Emphasis>, especially for closing feedback loops</>,
  <>skills are your team multiplier; build the <Emphasis color="green">infrastructure</Emphasis> to make them easy to share and reuse</>,
  <>semi-autonomous agents are the next frontier; start with <Emphasis color="orange">specialized agents</Emphasis>: ticket triage, code review, migrations, etc.</>,
  <><Emphasis color="green">people</Emphasis> are the greatest asset: AI amplifies the team, it doesn't replace it</>,
  ],
};

const LINKEDIN_BULLET: Record<Lang, ReactNode> = {
  uk: <>пишіть мені в LinkedIn, я люблю поспілкуватися про AI</>,
  en: <>message me on LinkedIn, I love chatting about AI</>,
};

// One extra reveal stage after the 5 takeaways for the LinkedIn bullet + QR
// pair on the right column.
const TOTAL_STAGES = TAKEAWAYS.uk.length + 1;

export const FinalSlide: SlideDefinition = {
  id: 'final',
  content: ({ revealStage, lang }) => (
    <>
      <h2 className="final-slide__heading">
        compacting the conversation...
      </h2>

      <div className="final-slide">
        <div className="final-slide__bullets">
          {TAKEAWAYS[lang].map((bullet, i) =>
            revealStage >= i + 1 ? (
              <SlideItem key={i} delay={0}>{bullet}</SlideItem>
            ) : null,
          )}
        </div>

        {revealStage >= TOTAL_STAGES && (
          <div className="final-slide__contact">
            <SlideItem delay={0}>{LINKEDIN_BULLET[lang]}</SlideItem>
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
