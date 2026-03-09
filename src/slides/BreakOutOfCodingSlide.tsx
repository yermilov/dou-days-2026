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

export const BreakOutOfCodingSlide: SlideDefinition = {
  id: 'break-out-of-coding',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">tips</span>{' '}
        <span className="text-orange">--break-out</span>
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
          install <Emphasis color="green">CLIs</Emphasis> (not MCPs!) for all
          dev tools you use
        </SlideItem>

        <SlideItem delay={0.14}>
          use the <Emphasis color="green">Claude Chrome extension</Emphasis> for
          cases when CLI can't do something —{' '}
          <Prompt>
            hey claude, open artifactory in chrome and generate api token for my pnpm access
          </Prompt>
        </SlideItem>

        <SlideItem delay={0.23}>
          claude won't do everything perfectly the first time — invest your time
          in <Emphasis color="orange">handholding</Emphasis>
        </SlideItem>

        <SlideItem delay={0.32}>
          after you've achieved your result successfully — convert your session
          into a <Emphasis color="green">skill</Emphasis>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    "CLIs first because they're scriptable, composable, and Claude already knows them. Chrome extension is the escape hatch for anything GUI-locked. And skills are how you lock in the gains.",
};
