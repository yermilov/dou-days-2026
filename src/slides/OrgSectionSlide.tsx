import { useEffect } from 'react';
import { SlideDefinition } from '../types/slides';
import agendaOrgImg from '../assets/agenda-org.png?url';

const VIEWPORT_BG = `linear-gradient(180deg,
    color-mix(in srgb, var(--dou-near-black) 78%, transparent) 0%,
    color-mix(in srgb, var(--dou-near-black) 30%, transparent) 26%,
    transparent 50%),
  url(${agendaOrgImg}) center/cover no-repeat var(--dou-near-black)`;

function OrgSectionContent() {
  useEffect(() => {
    const vp = document.querySelector<HTMLElement>('.stage-viewport');
    if (!vp) return;
    const prevBg = vp.style.background;
    vp.classList.add('org-section-viewport');
    vp.style.background = VIEWPORT_BG;
    return () => {
      vp.classList.remove('org-section-viewport');
      vp.style.background = prevBg;
    };
  }, []);

  return (
    <>
      <style>{`
        .stage-viewport.org-section-viewport .sonar-pattern { display: none; }
      `}</style>

      <h2
        style={{
          display: 'inline-block',
          padding: '0.55rem 1.4rem',
          marginLeft: '-1.4rem',
          background:
            'color-mix(in srgb, var(--dou-near-black) 62%, transparent)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          borderRadius: '14px',
          boxShadow:
            '0 12px 36px color-mix(in srgb, var(--dou-near-black) 70%, transparent)',
        }}
      >
        <span className="text-dim">//</span>{' '}
        <span className="text-green">ai-first</span>{' '}
        <span className="text-orange">організації</span>
      </h2>
    </>
  );
}

export const OrgSectionSlide: SlideDefinition = {
  id: 'org-section',
  background: VIEWPORT_BG,
  content: () => <OrgSectionContent />,
};
