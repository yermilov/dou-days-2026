import { ReactNode } from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

const TAKEAWAYS: ReactNode[] = [
  <>start with figuring out your personal <Emphasis color="green">vibe flow</Emphasis></>,
  <>break out of just coding — use Claude for <Emphasis color="orange">everything</Emphasis> you do, especially closing feedback loops</>,
  <>skills are your team's multiplier — build an <Emphasis color="green">infrastructure</Emphasis> to make them sharable and reusable</>,
  <>semi-autonomous agents are the next frontier — start with <Emphasis color="orange">specific-task agents</Emphasis>: issue triage, code review, migrations, ...</>,
  <><Emphasis color="green">humans</Emphasis> are the most important part — AI amplifies your team, it doesn't replace it</>,
  <>let's connect on LinkedIn <span style={{ color: 'var(--terminal-blue)' }}>→</span></>,
];

export const FinalSlide: SlideDefinition = {
  id: 'final',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ color: 'var(--terminal-blue)' }}>
        compacting the conversation...
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3xl)',
          width: '100%',
          paddingBottom: 'var(--space-xl)',
        }}
      >
        {/* Left column - bullets */}
        <div
          style={{
            flex: 1,
            maxWidth: '650px',
            textAlign: 'left',
          }}
        >
          {TAKEAWAYS.map((bullet, i) =>
            revealStage >= i + 1 ? (
              <SlideItem key={i} delay={0}>{bullet}</SlideItem>
            ) : null,
          )}
        </div>

        {/* Right column - QR code (revealed with last point) */}
        {revealStage >= TAKEAWAYS.length && (
          <img
            className="final-qr-reveal"
            src={linkedinQr}
            alt="LinkedIn QR code - Yarik Yermilov"
            style={{
              flexShrink: 0,
              maxWidth: '600px',
              maxHeight: 'calc(100vh - 180px)',
              objectFit: 'contain',
              borderRadius: 'var(--input-border-radius)',
              border: '2px solid var(--terminal-border)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              opacity: 0,
              animation: 'slideItemFadeIn 0.5s ease-out forwards',
              animationDelay: '0.1s',
            }}
            loading="lazy"
          />
        )}
      </div>
    </>
  ),
  maxRevealStages: TAKEAWAYS.length,
  notes:
    'Final takeaways: vibe flow foundation, use Claude beyond coding, skills marketplace, specific-task agents first, humans are the most important part, connect on LinkedIn. The QR code reveals together with the last point.',
};
