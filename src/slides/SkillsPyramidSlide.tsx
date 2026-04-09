import { SlideDefinition } from '../types/slides';
import { Code, Emphasis, SlideItem } from '../components/SlideElements';

export const SkillsPyramidSlide: SlideDefinition = {
  id: 'skills-pyramid',
  content: ({ revealStage }) => (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--skills-pyramid</span>
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
          <Emphasis color="green">Basic skills</Emphasis> — replacements for MCP definitions — teach how to use a tool via CLI / API / WebUI.{' '}
          <Code>github</Code>, <Code>gitlab</Code>, <Code>sourcegraph</Code>, <Code>victoriametrics</Code>, …
        </SlideItem>

        {revealStage >= 1 && (
          <SlideItem delay={0}>
            <Emphasis color="green">Task skills</Emphasis> — explain how to achieve small tasks based on basic skills.{' '}
            <Code>create-pr</Code> (based on <Code variant="orange">github</Code>), <Code>search-code</Code> (based on <Code variant="orange">sourcegraph</Code>)
          </SlideItem>
        )}

        {revealStage >= 2 && (
          <SlideItem delay={0}>
            <Emphasis color="green">Composite skills</Emphasis> — combine smaller skills to achieve larger tasks.{' '}
            <Code>investigate-bug</Code>, <Code>review-pr</Code>
          </SlideItem>
        )}
      </div>
    </>
  ),
  maxRevealStages: 2,
  notes:
    'Skills pyramid: basic skills replace MCP definitions (tool usage), task skills compose basic skills for small tasks, composite skills combine task skills for larger workflows like investigating bugs or reviewing PRs.',
};
