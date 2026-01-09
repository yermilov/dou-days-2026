import React from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, SlideLink, Emphasis } from '../components/SlideElements';

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
          коли це робити
        </AnimatedSectionHeader>

        <SlideItem delay={0.08}>
          якщо ви бачите що інструктуєте клод робити одне і те саме раз за
          разом — навчіть його цьому <Emphasis color="green">скілу</Emphasis>
        </SlideItem>

        <AnimatedSectionHeader color="purple" delay={0.14}>
          як це робити
        </AnimatedSectionHeader>

        <SlideItem delay={0.20}>
          як завжди, запускаємо пусту сессію, план мод, і погнали:{' '}
          <Prompt>please read {'{docs-url}'} and create a skill that will ...</Prompt>
        </SlideItem>

        <SlideItem delay={0.26}>
          або так: один раз{' '}
          <Prompt>
            please read {'{docs-url}'} and create a skill that will explain how to
            create a well crafted skill, name it skills-authorship
          </Prompt>
        </SlideItem>

        <SlideItem delay={0.32}>
          а далі ви можете <Emphasis color="orange">після</Emphasis> якоїсь дії
          написати{' '}
          <Prompt>use skills-authorship skill to turn ... into skill</Prompt>{' '}
          або{' '}
          <Prompt>use skills-authorship skill to update ... skill to ...</Prompt>
        </SlideItem>

        <AnimatedSectionHeader color="blue" delay={0.38}>
          приклади
        </AnimatedSectionHeader>

        <SlideItem delay={0.44}>
          пошук в логах, дебагінг проблем, перформенс оптимізації, генерація
          картинок, написання документації, ...
        </SlideItem>

        <SlideItem delay={0.50} size="compact">
          <SlideLink href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices">
            platform.claude.com/docs/.../agent-skills/best-practices
          </SlideLink>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Skills authoring - teach Claude reusable skills when you find yourself repeating instructions. Start new session with plan mode, read docs, create skill. Or create a meta-skill for skill authoring itself.',
};
