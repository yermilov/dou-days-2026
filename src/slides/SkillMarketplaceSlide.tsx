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
        <span className="text-green">skills</span>{' '}
        <span className="text-orange">--marketplace</span>
      </h2>

      <div style={{ display: 'flex', flex: 1, gap: '2rem', alignItems: 'flex-start', minHeight: 0 }}>

        {/* Left column — bullets swap on reveal */}
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {revealStage === 0 ? (
            <>
              <SlideItem delay={0.05}>
                first thing you would need to make it work is a way to distribute a skill
              </SlideItem>

              <SlideItem delay={0.15}>
                if you have exactly ONE repository you may commit skills there, but even for monorepo organizations this is rarely the case
              </SlideItem>

              <SlideItem delay={0.25}>
                at Superhuman, we have built a system that clones a github repo with the skills, symlinks it to user <code>.claude</code> directory and periodically fetches updates from remote
              </SlideItem>
            </>
          ) : (
            <>
              <SlideItem delay={0}>
                later Anthropic introduced <Emphasis color="green">marketplaces</Emphasis> which basically works exactly like that but natively
              </SlideItem>

              <SlideItem delay={0.1}>
                create ONE central internal <Emphasis color="orange">marketplace</Emphasis> for skills inside your organization
              </SlideItem>

              <SlideItem delay={0.2}>
                use plugins for <Emphasis color="orange">namespacing</Emphasis> — every user can select which plugins to install
              </SlideItem>

              <SlideItem delay={0.3}>
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
