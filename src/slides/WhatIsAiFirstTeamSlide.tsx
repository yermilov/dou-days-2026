import { SlideDefinition } from '../types/slides';
import { Emphasis, SlideItem } from '../components/SlideElements';

export const WhatIsAiFirstTeamSlide: SlideDefinition = {
  id: 'what-is-ai-first-team',
  content: (
    <>
      <h2 style={{ marginBottom: '2rem' }}>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">team</span>{' '}
        <span className="text-orange">--define</span>
      </h2>

      <div style={{ textAlign: 'left', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        <SlideItem delay={0.05}>
          <Emphasis color="orange">simplest definition:</Emphasis> a team of ai-first engineers
        </SlideItem>
        <SlideItem delay={0.12}>
          ai coding is young — no proven patterns for mastering it yet
        </SlideItem>
        <SlideItem delay={0.19}>
          it demands deep changes to how you personally work
        </SlideItem>
        <SlideItem delay={0.26}>
          so every engineer builds their own unique ai-first workflow...
        </SlideItem>
        <SlideItem delay={0.33}>
          ...or struggles to gain any real productivity boost at all
        </SlideItem>
        <SlideItem delay={0.40}>
          the workflows look different — but the <Emphasis color="green">building blocks are the same</Emphasis>
        </SlideItem>
      </div>
    </>
  ),
  notes:
    'Define ai-first team: team of ai-first engineers. AI coding is immature, no proven patterns, requires personal workflow changes. Everyone builds their own approach or fails to boost productivity. Workflows vary but building blocks are universal.',
};
