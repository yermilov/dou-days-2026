import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import superhumanAidevImage from '/superhuman-aidev.png?url';
import diagramImage from '/skill-distribution-diagram.png?url';

export const SkillMarketplaceSlide: SlideDefinition = {
  id: 'skill-marketplace',
  maxRevealStages: 1,
  content: ({ revealStage }: SlideContentProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>

      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--skills-marketplace</span>
      </h2>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left column — bullets swap on reveal */}
        <div key={revealStage} style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {revealStage === 0 ? (
            <>
              <SlideItem delay={0.05}>
                skills are small yet powerful <Emphasis color="green">building blocks</Emphasis> — share them across your team, build unique workflows on top
              </SlideItem>

              <SlideItem delay={0.15}>
                agents love documentation — convert all docs to skills; they <Emphasis color="green">self-improve</Emphasis> through usage
              </SlideItem>

              <SlideItem delay={0.25}>
                every engineer using a skill contributes improvements — making everyone <Emphasis color="orange">instantly more productive</Emphasis>
              </SlideItem>

              <SlideItem delay={0.35}>
                at Superhuman, we needed a way to distribute — we built a system that clones a GitHub repo with skills and symlinks to <code>.claude</code> directory
              </SlideItem>
            </>
          ) : (
            <>
              <SlideItem delay={0} reveal>
                Anthropic introduced <Emphasis color="green">marketplaces</Emphasis> — works exactly like that but natively
              </SlideItem>

              <SlideItem delay={0.12} reveal>
                create ONE central internal <Emphasis color="orange">marketplace</Emphasis> for skills inside your organization
              </SlideItem>

              <SlideItem delay={0.24} reveal>
                use plugins for <Emphasis color="orange">namespacing</Emphasis> — every user can select which plugins to install
              </SlideItem>

              <SlideItem delay={0.36} reveal>
                use <Emphasis color="green">Claude Enterprise</Emphasis> controls to enforce marketplace and certain plugins on all accounts
              </SlideItem>
            </>
          )}
        </div>

        {/* Right column — image swaps on reveal */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {revealStage === 0 ? (
            <img
              src={diagramImage}
              alt="Skill distribution diagram"
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain' }}
            />
          ) : (
            <img
              src={superhumanAidevImage}
              alt="Superhuman AI dev marketplace"
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: 'calc(var(--vh-full) - 220px)', objectFit: 'contain' }}
            />
          )}
        </div>

      </div>
    </div>
  ),
  notes: 'Distribution is the unsexy but critical part. Without a marketplace, skills stay siloed. With one, they compound. Stage 0: show our custom symlink approach + diagram. Stage 1: Anthropic now has native marketplaces + Superhuman screenshot.',
};
