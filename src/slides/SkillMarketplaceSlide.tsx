import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import superhumanAidevImage from '/superhuman-aidev.png?url';
import diagramImage from '/skill-distribution-diagram.png?url';

export const SkillMarketplaceSlide: SlideDefinition = {
  id: 'skill-marketplace',
  maxRevealStages: 1,
  content: ({ revealStage }: SlideContentProps) => (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--маркетплейс-скілів</span>
      </h2>

      <div className="skill-marketplace-body">
        {/* Left — bullets swap on reveal (key forces SlideItem replay) */}
        <div key={revealStage} className="skill-marketplace-body__text">
          {revealStage === 0 ? (
            <>
              <SlideItem delay={0.05}>
                скіли — маленькі, але потужні{' '}
                <Emphasis color="green">будівельні блоки</Emphasis> — діліться ними з командою, будуйте унікальні воркфлоу
              </SlideItem>

              <SlideItem delay={0.15}>
                агенти люблять документацію — конвертуйте всю документацію в скіли; вони{' '}
                <Emphasis color="green">самовдосконалюються</Emphasis> через використання
              </SlideItem>

              <SlideItem delay={0.25}>
                кожен інженер, що використовує скіл, додає покращення — і всі стають{' '}
                <Emphasis color="orange">миттєво продуктивнішими</Emphasis>
              </SlideItem>

              <SlideItem delay={0.35}>
                у Superhuman нам потрібен був спосіб дистрибуції — ми зробили систему, що клонує GitHub-репо зі скілами і симлінкає їх у директорію <code>.claude</code>
              </SlideItem>
            </>
          ) : (
            <>
              <SlideItem delay={0} reveal>
                Anthropic представили <Emphasis color="green">marketplaces</Emphasis> — працює так само, але нативно
              </SlideItem>

              <SlideItem delay={0.12} reveal>
                створіть ОДИН центральний внутрішній <Emphasis color="orange">marketplace</Emphasis> для скілів у вашій організації
              </SlideItem>

              <SlideItem delay={0.24} reveal>
                використовуйте плагіни для <Emphasis color="orange">неймспейсингу</Emphasis> — кожен користувач сам обирає, які плагіни встановити
              </SlideItem>

              <SlideItem delay={0.36} reveal>
                використовуйте контролі <Emphasis color="green">Claude Enterprise</Emphasis>, щоб примусово встановити marketplace і певні плагіни на всі акаунти
              </SlideItem>
            </>
          )}
        </div>

        {/* Right — image swap on reveal, framed in a deck panel */}
        <div className="skill-marketplace-body__media" key={`media-${revealStage}`}>
          {revealStage === 0 ? (
            <img src={diagramImage} alt="Схема дистрибуції скілів через симлінки" loading="lazy" />
          ) : (
            <img src={superhumanAidevImage} alt="Superhuman AI Dev marketplace" loading="lazy" />
          )}
        </div>
      </div>
    </>
  ),
  notes: 'Дистрибуція — нудна, але критична частина. Без маркетплейсу скіли залишаються в силосах. З ним — мультиплікуються. Stage 0: наш самописний підхід через симлінки + діаграма. Stage 1: Anthropic тепер має нативні marketplaces + скріншот Superhuman.',
};
