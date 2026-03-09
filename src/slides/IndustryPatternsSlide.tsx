import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const IndustryPatternsSlide: SlideDefinition = {
  id: 'industry-patterns',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">org</span>{' '}
        <span className="text-orange">--industry</span>
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
          AI coding agents are <Emphasis color="green">not just empty hype</Emphasis> — recent progress from the companies behind these tools shows a clear leap forward in software engineering processes
        </SlideItem>

        <SlideItem delay={0.12}>
          Anthropic releases Claude Code updates with <Emphasis color="orange">15–20 internal releases per day</Emphasis>, including major new features every couple of weeks
        </SlideItem>

        <SlideItem delay={0.18}>
          OpenAI claimed to build and ship <Emphasis color="green">Agent Builder in 6 weeks</Emphasis>; Anysphere continues to trailblaze with Cursor
        </SlideItem>

        <SlideItem delay={0.24}>
          common thread: these companies <Emphasis color="orange">build the tools they use</Emphasis> — synergy between engineering culture and tooling; tight feedback loops between tool developers and tool users
        </SlideItem>

        <SlideItem delay={0.32}>
          they ship <Emphasis color="green">a lot of features, fast</Emphasis> — features are unpolished but receive immediate user feedback; "vibes" and direct feedback replace A/B tests and lengthy UX studies; features that don't resonate are removed without mercy
        </SlideItem>

        <SlideItem delay={0.40}>
          <Emphasis color="orange">less prominent role</Emphasis> for classic PMs and UX researchers; more prominent role for product-minded engineers and coding designers
        </SlideItem>

        <SlideItem delay={0.48}>
          they tolerate frequent outages and performance degradations — and it <Emphasis color="green">doesn't hurt</Emphasis> company perception from users or investors
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'The meta-lesson: these companies eat their own dog food. That creates a feedback loop no external user study can replicate.',
};
