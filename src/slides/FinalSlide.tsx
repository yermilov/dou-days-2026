import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

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
          {revealStage >= 1 && (
            <SlideItem delay={0}>
              start with figuring out your personal <Emphasis color="green">vibe flow</Emphasis>
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0}>
              break out of just coding — use Claude for{' '}
              <Emphasis color="orange">everything</Emphasis> you do, especially closing feedback loops
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0}>
              skills are your team's multiplier — build an{' '}
              <Emphasis color="green">infrastructure</Emphasis> to make them sharable and reusable
            </SlideItem>
          )}

          {revealStage >= 4 && (
            <SlideItem delay={0}>
              semi-autonomous agents are the next frontier — start with{' '}
              <Emphasis color="orange">specific-task agents</Emphasis>: issue triage, code review, migrations, ...
            </SlideItem>
          )}

          {revealStage >= 5 && (
            <SlideItem delay={0}>
              <Emphasis color="green">humans</Emphasis> are the most important part —
              AI amplifies your team, it doesn't replace it
            </SlideItem>
          )}

          {revealStage >= 6 && (
            <SlideItem delay={0}>
              let's connect on LinkedIn{' '}
              <span style={{ color: 'var(--terminal-blue)' }}>→</span>
            </SlideItem>
          )}
        </div>

        {/* Right column - QR code (revealed with last point) */}
        {revealStage >= 6 && (
          <img
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
  maxRevealStages: 6,
  notes:
    'Final slide - 5 key takeaways: vibe flow foundation, use Claude beyond coding, skills marketplace, specific-task agents first, connect on LinkedIn. Press r 5 times to reveal all points + QR code.',
};
