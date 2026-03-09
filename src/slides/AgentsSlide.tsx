import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

export const AgentsSlide: SlideDefinition = {
  id: 'agents',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">skills</span>{' '}
        <span className="text-orange">--agents</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <SlideItem delay={0.08}>
          you become a true <Emphasis color="green">ai-first team</Emphasis> when your skills are used not only by humans, but also by autonomous or semi-autonomous agents
        </SlideItem>

        <SlideItem delay={0.16}>
          I don't believe in autonomous agents that receive a task description and go all the way to pushing code to production
        </SlideItem>

        <SlideItem delay={0.24}>
          humans are critical in steering the agent into the right direction, avoiding fatal disasters, and enabling <Emphasis color="orange">self-learning loops</Emphasis>
        </SlideItem>

        <SlideItem delay={0.32}>
          however, I do believe in agents that do <Emphasis color="green">specific tasks</Emphasis> autonomously: issue triager, oncall bot, knowledge bot, code reviewer — and specifically effective are <Emphasis color="orange">migrators</Emphasis>: new framework, new library, new infrastructure, etc.
        </SlideItem>

        <SlideItem delay={0.42}>
          here skills are critical to give agents all necessary knowledge — and the fact that they are shared between humans and agents keeps them <Emphasis color="green">always actual</Emphasis>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Skills shared between humans and agents create a virtuous cycle — humans improve skills, agents benefit; agents expose gaps, humans fix them.',
};
