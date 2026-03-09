import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const SkillFlywheelSlide: SlideDefinition = {
  id: 'skill-flywheel',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">skills</span>{' '}
        <span className="text-orange">--flywheel</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.05}>
          once you start sharing skills across your team, <Emphasis color="green">magic</Emphasis> starts to happen
        </SlideItem>

        <SlideItem delay={0.12}>
          skills are small yet powerful building blocks — people can share them yet build their own workflows on top
        </SlideItem>

        <SlideItem delay={0.19}>
          skill examples: <code>setup-dev-environment</code>, <code>commit</code>, <code>create-pr</code>, <code>launch-local-env</code>, <code>test-feature</code>, <code>generate-release-notes</code>, <code>fetch-logs</code>, <code>read-performance-report</code>, ...
        </SlideItem>

        <SlideItem delay={0.26}>
          humans don't like to read documentation and hate to write it — agents <Emphasis color="green">love</Emphasis> to do both
        </SlideItem>

        <SlideItem delay={0.33}>
          basically you can stop writing documentation, and convert all your existing documentation to skills
        </SlideItem>

        <SlideItem delay={0.40}>
          every time every engineer on your team uses a skill, they contribute improvement to it — making everyone <Emphasis color="orange">instantly more productive</Emphasis>
        </SlideItem>

        <SlideItem delay={0.47}>
          migrations are super easy — if you've migrated from X to Y, just rewrite all corresponding skills
        </SlideItem>

      </div>
    </>
  ),
  notes:
    'Skills compound. Each use makes them better. Each improvement benefits everyone. That\'s the flywheel.',
};
