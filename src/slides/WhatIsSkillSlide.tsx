import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import spaceBg from '/skill-space-bg.png?url';
import leftAstronaut from '/skill-was-it-md.png?url';
import rightAstronaut from '/skill-always-been.png?url';

export const WhatIsSkillSlide: SlideDefinition = {
  id: 'what-is-skill',
  content: ({ revealStage }) => (
    <div style={{ width: '100%' }}>
      <style>{`
        @keyframes astronautFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
      `}</style>

      {/* Title — on the terminal dark background, always readable */}
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--skills</span>
      </h2>

      {/* Space background area — fills all remaining height */}
      <div
        style={{
          position: 'relative',
          height: 'calc(var(--vh-full) - 195px)',
          overflow: 'hidden',
          borderRadius: '6px',
        }}
      >
        {/* Space background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${spaceBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,14,20,0.5)',
            pointerEvents: 'none',
          }}
        />

        {/* 3-column layout */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0 0.25rem',
          }}
        >
          {/* Left astronaut */}
          <div
            style={{
              flex: '0 0 24%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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

          {/* Bullets */}
          <div
            style={{
              flex: 1,
              textAlign: 'left',
              background: 'rgba(10,14,20,0.8)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <SlideItem delay={0.05}>
              skill is just an <Emphasis color="green">md file</Emphasis> with
              instructions how to do something
            </SlideItem>

            {revealStage >= 1 && (
              <SlideItem delay={0}>
                unlike <Emphasis color="orange">MCP server</Emphasis> — doesn't
                waste context window, loads only on model's demand
              </SlideItem>
            )}

            {revealStage >= 2 && (
              <SlideItem delay={0}>
                unlike <Emphasis color="orange">slash command</Emphasis> — model
                can invoke it when it needs it
              </SlideItem>
            )}

            {revealStage >= 3 && (
              <SlideItem delay={0}>
                can be a full <Emphasis color="green">library</Emphasis> of many
                md files hyperlinked — model navigates and loads as needed
              </SlideItem>
            )}

            {revealStage >= 4 && (
              <SlideItem delay={0}>
                can package{' '}
                <Emphasis color="green">TypeScript / Python / bash scripts</Emphasis>{' '}
                for deterministic automation
              </SlideItem>
            )}

            {revealStage >= 5 && (
              <SlideItem delay={0}>
                after success — switch to plan mode:{' '}
                <span className="text-quote">
                  'please read{' '}
                  <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
                    platform.claude.com/docs/.../agent-skills/best-practices
                  </SlideLink>{' '}
                  and create a skill that will replicate how we did X'
                </span>
              </SlideItem>
            )}

            {revealStage >= 6 && (
              <SlideItem delay={0}>
                every time something wasn't perfect — finish with:{' '}
                <span className="text-quote">
                  'reflect on the session and update the skill files to avoid
                  mistakes and streamline experience next time'
                </span>
              </SlideItem>
            )}
          </div>

          {/* Right astronaut */}
          <div
            style={{
              flex: '0 0 22%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
      </div>
    </div>
  ),
  maxRevealStages: 6,
  notes:
    'A skill is just markdown. After achieving a result, create a skill from it. Then iterate: every imperfect use is a chance to improve the skill via reflect.',
};
