import { useState, useEffect, useRef } from 'react';
import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';

const SKILL_MD_URL =
  'https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/skill-creator/skills/skill-creator/SKILL.md';

const STYLES = `
  @keyframes terminalPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }
  @keyframes loadingDot {
    0%, 80%, 100% { opacity: 0; }
    40%           { opacity: 1; }
  }
  @keyframes skillMdScroll {
    0%     { transform: translateY(0); animation-timing-function: linear; }
    12.5%  { transform: translateY(-1%); animation-timing-function: linear; }
    25%    { transform: translateY(-5%); animation-timing-function: linear; }
    50%    { transform: translateY(-20%); animation-timing-function: linear; }
    100%   { transform: translateY(-100%); }
  }
  @keyframes revealPanel {
    from { opacity: 0; transform: translateX(18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

function MetaSkillsContent({ revealStage }: { revealStage: number }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(SKILL_MD_URL)
      .then(r => {
        if (!r.ok) throw new Error('fetch failed');
        return r.text();
      })
      .then(setContent)
      .catch(() => setError(true));
  }, []);

  const colHeight = 'calc(var(--vh-full) - 260px)';

  return (
    <>
      <style>{STYLES}{`
        .ms-bullets .slide-item { margin-bottom: 0; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{ marginBottom: '0.8rem' }}>
          
          <span className="text-green">pattern</span>{' '}
          <span className="text-orange">--meta-skills</span>
        </h2>

        <div style={{ flex: 1, display: 'flex', gap: '2rem', alignItems: 'center', minHeight: 0 }}>

          {/* ── Left column: bullets ── */}
          <div className="ms-bullets" style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <SlideItem delay={0.08}>
            first most important skill in your marketplace to create is a skill to{' '}
            <Emphasis color="green">create skills</Emphasis>
          </SlideItem>

          <SlideItem delay={0.18}>
            use{' '}
            <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
              platform.claude.com/docs/.../best-practices
            </SlideLink>{' '}
            as a starting point
          </SlideItem>

          <SlideItem delay={0.28}>
            embrace all best practices: update with learnings after every usage, feed it with deep research reports and blog posts
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              or just switch to the <Emphasis color="green">off-the-shelf</Emphasis> skills-creator skill from Anthropic:{' '}
              <SlideLink href="https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator">
                github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator
              </SlideLink>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              you would need to figure out balance between{' '}
              <Emphasis color="green">off-the-shelf</Emphasis> skills and more{' '}
              <Emphasis color="orange">tailored and polished</Emphasis> ones created in-house
            </SlideItem>
          )}
        </div>

        {/* ── Right column: scrolling SKILL.md (stage 1 only) ── */}
        {revealStage >= 1 && (
          <div
            style={{
              flex: 1,
              height: colHeight,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(126,231,135,0.35)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'rgba(126,231,135,0.85)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'revealPanel 0.5s ease-out both',
            }}
          >
            {/* CRT scan lines */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }} />

            {/* Top fade */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '60px', zIndex: 4, pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
            }} />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', zIndex: 4, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            }} />

            {/* Corner decorations */}
            {['top:4px;left:4px', 'top:4px;right:4px', 'bottom:4px;left:4px', 'bottom:4px;right:4px'].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute', zIndex: 5, width: '6px', height: '6px',
                borderColor: 'rgba(126,231,135,0.5)',
                borderStyle: 'solid',
                borderWidth: i === 0 ? '1px 0 0 1px' : i === 1 ? '1px 1px 0 0' : i === 2 ? '0 0 1px 1px' : '0 1px 1px 0',
                ...Object.fromEntries(pos.split(';').map(p => { const [k, v] = p.split(':'); return [k, v]; })),
              }} />
            ))}

            {/* Header */}
            <div style={{
              padding: '6px 12px',
              borderBottom: '1px solid rgba(126,231,135,0.2)',
              color: 'rgba(126,231,135,0.6)',
              letterSpacing: '0.08em',
              animation: 'terminalPulse 3s ease-in-out infinite',
              flexShrink: 0,
              zIndex: 5,
            }}>
              ░░░ SKILL.md - skill-creator ░░░
            </div>

            {/* Scrollable content area */}
            <div ref={containerRef} style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              {!content && !error && (
                <div style={{ padding: '16px', color: 'rgba(126,231,135,0.5)' }}>
                  {['', '', ''].map((_, i) => (
                    <span key={i} style={{ animation: `loadingDot 1.4s ${i * 0.2}s ease-in-out infinite` }}>●</span>
                  ))}
                  {' '}loading SKILL.md
                </div>
              )}

              {error && (
                <div style={{ padding: '16px', color: 'rgba(240,136,62,0.7)' }}>
                  ✗ failed to fetch SKILL.md
                </div>
              )}

              {content && (
                <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
                  <div
                    ref={contentRef}
                    style={{
                      padding: '12px 16px',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                      animation: 'skillMdScroll 120s linear infinite',
                      willChange: 'transform',
                    }}
                  >
                    {content}
                    {/* Repeat for seamless loop */}
                    <div style={{ marginTop: '2em', borderTop: '1px solid rgba(126,231,135,0.15)', paddingTop: '2em' }}>
                      {content}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '4px 12px',
              borderTop: '1px solid rgba(126,231,135,0.2)',
              color: 'rgba(126,231,135,0.35)',
              letterSpacing: '0.12em',
              flexShrink: 0,
              zIndex: 5,
            }}>
              [END OF TRANSMISSION]
            </div>
          </div>
        )}

        </div>
      </div>
    </>
  );
}

export const MetaSkillsSlide: SlideDefinition = {
  id: 'meta-skills',
  maxRevealStages: 2,
  content: ({ revealStage }: SlideContentProps) => <MetaSkillsContent revealStage={revealStage} />,
  notes: 'Meta-skills are the highest leverage investment. One good skill-creation skill multiplies the quality of everything else. Stage 1: reveal 4th bullet + scrolling SKILL.md panel.',
};
