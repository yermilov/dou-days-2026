import { ReactNode, useEffect } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import spaceBg from '/skill-space-bg.png?url';
import leftAstronaut from '/skill-was-it-md.png?url';
import rightAstronaut from '/skill-always-been.png?url';

const BULLETS: ReactNode[] = [
  <>скілл — це просто <Emphasis color="green">SKILL.md</Emphasis> файл з інструкціями, як щось робити</>,
  <>на відміну від <Emphasis color="orange">MCP server</Emphasis> — не витрачає context window, завантажується лише за потребою моделі</>,
  <>на відміну від <Emphasis color="orange">slash command</Emphasis> — модель сама викликає його, коли потрібно</>,
  <>може бути цілою <Emphasis color="green">бібліотекою</Emphasis> md-файлів з посиланнями — модель навігує та завантажує за потребою</>,
  <>може містити <Emphasis color="green">TypeScript / Python / bash</Emphasis> скрипти для детермінованої автоматизації</>,
];

const VIEWPORT_BG = `linear-gradient(180deg,
    color-mix(in srgb, var(--dou-near-black) 55%, transparent) 0%,
    color-mix(in srgb, var(--dou-near-black) 35%, transparent) 100%),
  url(${spaceBg}) center/cover no-repeat`;

function WhatIsSkillContent({ revealStage }: SlideContentProps) {
  // Paint the entire stage viewport (including letterbox bars) with the space
  // backdrop and hide the random body sonar — restored on unmount so adjacent
  // slides keep the standard chrome.
  useEffect(() => {
    const vp = document.querySelector<HTMLElement>('.stage-viewport');
    if (!vp) return;
    const prevBg = vp.style.background;
    vp.classList.add('what-is-skill-viewport');
    vp.style.background = VIEWPORT_BG;
    return () => {
      vp.classList.remove('what-is-skill-viewport');
      vp.style.background = prevBg;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes astronautFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        .what-is-skill__card .slide-item:last-child { margin-bottom: 0; }
.stage-viewport.what-is-skill-viewport .sonar-pattern { display: none; }
      `}</style>

      <h2
        style={{
          textShadow:
            '0 4px 24px color-mix(in srgb, var(--dou-near-black) 80%, transparent)',
        }}
      >
        <span className="text-dim">//</span>{' '}
        <span className="text-green">скіли</span>{' '}-{' '}
        <span className="text-orange">база, основа, фундамент</span>
      </h2>

      <div
        style={{
          flex: 1,
          position: 'relative',
          // Push the row past the .slide--body 120px side padding so the
          // astronauts can hug the slide's outer edges.
          marginLeft: '-120px',
          marginRight: '-120px',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {/* Left astronaut — anchored to the slide's outer left edge so the
            bullet card can claim more central reading width. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '26%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={leftAstronaut}
            alt="wait, it's all .md files?"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'screen',
              animation: 'astronautFloat 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Bullets — frosted-glass card on the space backdrop. Width fits
            inside the gap between the two 26% astronaut bands so the card
            never overlaps the astronauts' speech bubbles. */}
        <div
          className="what-is-skill__card"
          style={{
            width: '46%',
            alignSelf: 'stretch',
            maxHeight: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left',
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--dou-near-black) 45%, transparent) 0%, color-mix(in srgb, var(--dou-deep-purple) 30%, transparent) 100%)',
            border:
              '1px solid color-mix(in srgb, var(--dou-white) 14%, transparent)',
            borderRadius: '14px',
            padding: '1.2rem 1.6rem',
            backdropFilter: 'blur(22px) saturate(140%)',
            WebkitBackdropFilter: 'blur(22px) saturate(140%)',
            boxShadow:
              '0 18px 48px color-mix(in srgb, var(--dou-near-black) 70%, transparent), inset 0 1px 0 color-mix(in srgb, var(--dou-white) 12%, transparent)',
            ['--slide-line-height-normal' as string]: '1.35',
            position: 'relative',
            zIndex: 1,
          } as React.CSSProperties}
        >
          {BULLETS.map((bullet, i) =>
            revealStage >= i ? (
              <SlideItem key={i} delay={i === 0 ? 0.05 : 0}>{bullet}</SlideItem>
            ) : null,
          )}
        </div>

        {/* Right astronaut — anchored to the slide's outer right edge. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '26%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={rightAstronaut}
            alt="always have been."
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'screen',
              animation: 'astronautFloat 7s ease-in-out infinite reverse',
            }}
          />
        </div>
      </div>
    </>
  );
}

export const WhatIsSkillSlide: SlideDefinition = {
  id: 'what-is-skill',
  // Slide-level background mirrors the viewport one so mix-blend-mode on the
  // astronauts has a local backdrop to screen against.
  background: VIEWPORT_BG,
  content: (props) => <WhatIsSkillContent {...props} />,
  maxRevealStages: BULLETS.length - 1,
  notes:
    'Skill — це просто markdown. Після успішного результату — створіть skill із нього. Далі ітеруй: кожне неідеальне використання — шанс покращити skill через reflect.',
};
