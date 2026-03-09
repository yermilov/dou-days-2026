import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis, SlideLink } from '../components/SlideElements';
import linkedinQr from '/linkedin-qr.jpeg?url';

export const FinalSlide: SlideDefinition = {
  id: 'final',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--terminal-blue)' }}>
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
          <SlideItem delay={0.05}>
            treat Claude Code like a talented junior engineer on day one — invest in{' '}
            <Emphasis color="green">context</Emphasis>, not just prompts
          </SlideItem>

          <SlideItem delay={0.10}>
            build a <Emphasis color="green">shared skills marketplace</Emphasis> — the first skill to create is one that teaches how to create skills
          </SlideItem>

          <SlideItem delay={0.15}>
            don't mandate AI coding — raise <Emphasis color="green">delivery expectations</Emphasis> and let engineers find their path
          </SlideItem>

          <SlideItem delay={0.20}>
            register on Twitter, follow important AI engineers:{' '}
            <SlideLink href="https://x.com/bcherny">@bcherny</SlideLink>,{' '}
            <SlideLink href="https://x.com/trq212">@trq212</SlideLink>,{' '}
            <SlideLink href="https://x.com/ClaudeCodeLog">@ClaudeCodeLog</SlideLink>,{' '}
            <SlideLink href="https://x.com/mitchellh">@mitchellh</SlideLink>,{' '}
            <SlideLink href="https://x.com/steipete">@steipete</SlideLink>
          </SlideItem>

          <SlideItem delay={0.25}>
            use Claude Code to increase your{' '}
            <Emphasis color="green">throughput</Emphasis> not{' '}
            <Emphasis color="orange">latency</Emphasis>
          </SlideItem>

          <SlideItem delay={0.30}>
            write to me on LinkedIn{' '}
            <span style={{ color: 'var(--terminal-blue)' }}>→</span>
          </SlideItem>
        </div>

        {/* Right column - QR code */}
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
            animationDelay: '0.35s',
          }}
          loading="lazy"
        />
      </div>
    </>
  ),
  notes:
    'Final slide - closing thoughts: invest in context not just prompts, build shared skills marketplace, raise delivery expectations, follow AI engineers on Twitter, focus on throughput not latency, connect on LinkedIn',
};
