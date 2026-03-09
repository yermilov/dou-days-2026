import React from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

// Section header with animation for this slide
function AnimatedSectionHeader({
  children,
  color,
  delay,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
  delay: number;
}) {
  return (
    <div
      className={`section-header section-header--${color}`}
      style={{
        opacity: 0,
        animation: 'slideItemFadeIn 0.35s ease-out forwards',
        animationDelay: `${delay}s`,
      }}
    >
      {'// '}
      {children}
    </div>
  );
}

// Quoted prompt text (orange with italic styling)
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--terminal-orange)',
        fontStyle: 'italic',
        fontSize: '0.85em',
      }}
    >
      '{children}'
    </span>
  );
}

export const SkillsAuthoringSlide: SlideDefinition = {
  id: 'skills-authoring',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">teach</span>{' '}
        <span className="text-orange">--skills</span>
      </h2>

      <div
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <AnimatedSectionHeader color="green" delay={0.03}>
          when to do it
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          if you find yourself instructing Claude to do the same thing over and
          over — teach it that <Emphasis color="green">skill</Emphasis>
        </SlideItem>

        <AnimatedSectionHeader color="purple" delay={0.14}>
          how to do it
        </AnimatedSectionHeader>

        <SlideItem delay={0.20}>
          as always, start a fresh session, plan mode, and go:{' '}
          <Prompt>please read https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices and create a skill that will ...</Prompt>
        </SlideItem>

        <SlideItem delay={0.26}>
          or like this: once{' '}
          <Prompt>
            please read https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices and create a skill that will explain how to
            create a well crafted skill, name it skills-authorship
          </Prompt>
        </SlideItem>

        <SlideItem delay={0.32}>
          and then you can <Emphasis color="orange">after</Emphasis> some action
          write{' '}
          <Prompt>use skills-authorship skill to turn ... into skill</Prompt>{' '}
          or{' '}
          <Prompt>use skills-authorship skill to update ... skill to ...</Prompt>
        </SlideItem>

        <AnimatedSectionHeader color="blue" delay={0.38}>
          examples
        </AnimatedSectionHeader>

        <SlideItem delay={0.44}>
          log search, debugging issues, performance optimizations, image
          generation, writing documentation, ...
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start new session with plan mode, read docs, create skill. Or create a meta-skill for skill authoring itself.',
};
