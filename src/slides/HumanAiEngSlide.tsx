import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const HumanAiEngSlide: SlideDefinition = {
  id: 'human-ai-eng',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">org</span>{' '}
        <span className="text-orange">--human-ai</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.06}>
          the tricky part in Human+AI engineering is <Emphasis color="orange">humans</Emphasis> — mandating AI coding won't work; human inertia is real
        </SlideItem>

        <SlideItem delay={0.14}>
          instead: raise expectations given AI's potential — redefine what you expect from teams in terms of prototype speed, feature throughput, and KTLO reduction, and hold everyone accountable
        </SlideItem>

        <SlideItem delay={0.22}>
          don't leave engineers alone: invest in <Emphasis color="green">regular training, peer mentoring, opinionated tooling, office hours, and win/lose stories</Emphasis>
        </SlideItem>

        <SlideItem delay={0.30}>
          a known pain point is that engineers don't have breathing room to go through the learning curve — consider <Emphasis color="orange">relaxing delivery expectations early</Emphasis> to give space to learn, then raise them higher than before
        </SlideItem>

        <SlideItem delay={0.38}>
          from the technical side, <Emphasis color="green">legacy codebases</Emphasis> are the biggest drag — it is often unrealistic to adapt massive legacy repositories to AI-first principles in a reasonable timeframe
        </SlideItem>

        <SlideItem delay={0.42}>
          greenfield projects should be <Emphasis color="orange">AI-first from day one</Emphasis> — they give the highest velocity returns and prove what is possible at scale
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Legacy code is the organizational debt that AI exposes fastest. Greenfield is where you build the proof points.',
};
