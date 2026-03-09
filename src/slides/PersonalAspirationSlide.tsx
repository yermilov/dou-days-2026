import React from 'react';
import { SlideDefinition } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';

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

export const PersonalAspirationSlide: SlideDefinition = {
  id: 'personal-aspiration',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">engineer</span>{' '}
        <span className="text-orange">--aspire</span>
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
          coding is the obvious starting point for AI-first engineering — but
          that's just very smart, costly <Emphasis color="orange">autocomplete</Emphasis>
        </SlideItem>

        <SlideItem delay={0.12}>
          set yourself a goal: do{' '}
          <Emphasis color="green">everything</Emphasis> from inside Claude Code
        </SlideItem>

        <SlideItem delay={0.18}>
          <Prompt>hey claude, please commit my changes</Prompt>
        </SlideItem>

        <SlideItem delay={0.24}>
          <Prompt>hey claude, configure dev environment for me</Prompt>
        </SlideItem>

        <SlideItem delay={0.30}>
          <Prompt>hey claude, here is a bug report I've received: ...</Prompt>
        </SlideItem>

        <SlideItem delay={0.36}>
          <Prompt>
            hey claude, take a look at the logs / metrics / AB test results / perf report: ...
          </Prompt>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Coding is just the entry point. The real unlock is when you never leave Claude Code — every workflow, every tool, every task flows through it.',
};
