import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import stickerPhoto from '/sticker-photo.jpeg?url';

const STYLES = `
  @keyframes stickerReveal {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .sticker-reveal {
    animation: stickerReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

function SimpleSvgTerminal() {
  return (
    <svg width="100%" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: 'calc(var(--vh-full) - 320px)' }}>
      <rect x="0" y="0" width="400" height="100" fill="#000000" />
      <text x="20" y="40" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="16">&gt;</text>
      <text x="33" y="42" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="16">█</text>
      <text x="20" y="65" textAnchor="start" fill="#ff7a00" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="16">✶ You are absolutely right!</text>
    </svg>
  );
}

function SelfReferentialSvg() {
  return (
    <svg width="100%" viewBox="0 0 370 180" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: 'calc(var(--vh-full) - 320px)' }}>
      <rect x="0" y="0" width="370" height="180" fill="#000000" />
      <text x="20" y="35" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">&gt;</text>
      <text x="33" y="35" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">Create SVG 400x140 black: put</text>
      <text x="33" y="50" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">"&gt;" gray at (20,40), put full</text>
      <text x="33" y="65" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">text of this prompt in terminal</text>
      <text x="33" y="80" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">area with word wrapping and █</text>
      <text x="33" y="95" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">at end, put "✶ You are absolutely</text>
      <text x="33" y="110" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">right!" orange at (20,115)</text>
      <text x="33" y="125" fill="#808080" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="14">█</text>
      <text x="20" y="150" fill="#ff7a00" fontFamily="Monaco, 'SF Mono', 'Courier New', monospace" fontSize="20">✶ You are absolutely right!</text>
    </svg>
  );
}

function StickerFunContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}</style>

      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--explore-and-have-fun</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Left column: bullets */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            ChatGPT generates images in chat — Claude Code generates{' '}
            <Emphasis color="orange">SVG code</Emphasis> instead
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              challenge: create a <Emphasis color="green">self-referential</Emphasis> image
              {' '}— a prompt that generates an image containing itself
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              the trick: instruct Claude Code to create a{' '}
              <Emphasis color="orange">feedback loop</Emphasis> — generate, extract, regenerate,
              compare — iterate until <Emphasis color="green">fixed point</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              convert text to curves via{' '}
              <Emphasis color="green">Inkscape CLI</Emphasis>, send to print shop —
              {' '}idea to physical sticker, almost fully by Claude Code
            </SlideItem>
          )}
        </div>

        {/* Right column: visuals */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
          {revealStage === 0 && (
            <div key="simple" className="sticker-reveal" style={{ width: '100%' }}>
              <SimpleSvgTerminal />
            </div>
          )}
          {(revealStage === 1 || revealStage === 2) && (
            <div key="self-ref" className="sticker-reveal" style={{ width: '100%' }}>
              <SelfReferentialSvg />
            </div>
          )}
          {revealStage === 3 && (
            <div key="photo" className="sticker-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img
                src={stickerPhoto}
                alt="Physical You Are Absolutely Right sticker on a laptop"
                loading="lazy"
                style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export const StickerFunSlide: SlideDefinition = {
  id: 'sticker-fun',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <StickerFunContent revealStage={revealStage} />,
  notes:
    'Fun example: self-referential SVG sticker. Stage 0: SVG as image generation. Stage 1: quine challenge. Stage 2: feedback loop trick. Stage 3: physical sticker result.',
};
