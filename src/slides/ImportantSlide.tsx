import { SlideDefinition } from '../types/slides';
import { Emphasis, SectionHeader, SlideItem } from '../components/SlideElements';
import { PacManCanvas } from '../components/pacman/PacManCanvas';

export const ImportantSlide: SlideDefinition = {
  id: 'important',
  content: ({ revealStage }) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <h2>
        <span className="text-dim">//</span>{' '}
        <span className="text-green">об'єм роботи</span>{' '}
        <span className="text-orange">vs швидкість роботи</span>
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-xl)',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left column - bullet points */}
        <div
          style={{
            flex: '1 1 60%',
            maxWidth: '900px',
            textAlign: 'left',
          }}
        >
          <SlideItem delay={0.05}>
            Claude Code дає <Emphasis>об'єм</Emphasis> роботи, не{' '}
            <Emphasis color="orange">швидкість</Emphasis>
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0}>
              дайте задачу і <Emphasis>переключайтесь</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SectionHeader color="purple">але є винятки</SectionHeader>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              Claude розуміє ваш домен{' '}
              <Emphasis color="orange">гірше</Emphasis> за вас
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0.07}>
              ви часто напишете код{' '}
              <Emphasis color="orange">краще</Emphasis> і{' '}
              <Emphasis color="orange">швидше</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0.14}>
              <Emphasis>виняток</Emphasis> — незнайомий стек: дні-тижні економії
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              залипати в термінал ={' '}
              <Emphasis color="orange">втрата продуктивності</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0.1}>
              натомість — запустіть і <Emphasis>переключайтесь</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0}>
              або запустіть claude і йдіть відпочивати
            </SlideItem>
          )}

        </div>

        {/* Right column - Pac-Man animation */}
        <div
          style={{
            flex: '0 0 40%',
            maxHeight: 'calc(var(--vh-full) - 220px)',
            aspectRatio: '320 / 240',
          }}
        >
          <PacManCanvas revealStage={revealStage} />
        </div>
      </div>
    </div>
  ),
  maxRevealStages: 4,
  notes:
    "Перевірка реальності з 8-bit анімацією. Перші два пункти видно одразу, далі натискай r. Тема А — паралельність: Claude дає об'єм, а не швидкість, тому делегуйте і переключайтесь. Тема Б (stage 2, помічена SectionHeader) — Claude знає ваш домен гірше, ви часто напишете кращий код швидше; виняток — незнайомий стек. Розв'язка: залипання на термінал = втрата продуктивності; запустіть і йдіть відпочивати.",
};
