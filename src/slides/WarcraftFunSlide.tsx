import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import warcraftWhat from '/warcraft-what.wav?url';
import warcraftComplete from '/warcraft-complete.wav?url';
import warcraftYes from '/warcraft-yes.wav?url';

const STYLES = `
  #warcraft-right .code-block {
    margin: 0;
  }
  @keyframes warcraftReveal {
    from { opacity: 0; transform: translateX(14px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .warcraft-reveal {
    animation: warcraftReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

const SKILL_CODE = `# warcraft-work-sounds
# superhumans-org/superhuman-aidev marketplace

> hey claude, set up warcraft sounds

1. fetch .wav from warcraft.wiki.gg
2. organize into categories:
     ready/  yes/  complete/  what/
3. configure Notification + Stop hooks
4. enjoy peon sounds in your workflow

# sound categories:
#   what/     → "what?" "what do you want?"
#   ready/    → "ready to work"
#   yes/      → "yes, me lord"
#   complete/ → "work complete"`;

const HOOKS_CODE = [
  '{ "hooks": {',
  '    "Notification": [{',
  '      "hooks": [{',
  '        "type": "command",',
  '        "command":',
  '          "DIR=~/.claude/sounds/warcraft2/what;',
  '           F=($DIR/ *.wav);',
  '           afplay -v 1.5 ${F[RANDOM % ${#F[@]}]}"',
  '      }]',
  '    }],',
  '',
  '    "Stop": [{',
  '      "hooks": [{',
  '        "type": "command",',
  '        "command":',
  '          "F=(~/.claude/sounds/warcraft2/',
  '             {ready,yes,complete}/ *.wav);',
  '           afplay -v 1.5 ${F[RANDOM % ${#F[@]}]}"',
  '      }]',
  '    }]',
  '  }',
  '}',
].join('\n');

const VERIFY_CODE = [
  '$ for cat in ready yes complete what; do',
  '    count=$(ls ~/...warcraft2/$cat/ *.wav | wc -l)',
  '    echo "$cat: $count sounds"',
  '  done',
  '',
  'ready:    2 sounds',
  'yes:      4 sounds',
  'complete: 2 sounds',
  'what:     10 sounds',
  '',
  '# test a "what?" sound',
  '$ afplay -v 1.5 ~/.claude/sounds/warcraft2/what/Owhat1.wav',
  '',
  '# test a "work complete" sound',
  '$ afplay -v 1.5 ~/.claude/sounds/warcraft2/complete/Owrkdone.wav',
].join('\n');

function Sound({ src }: { src: string }) {
  return <audio autoPlay src={src} />;
}

function WarcraftFunContent({ revealStage }: { revealStage: number }) {
  return (
    <>
      <style>{STYLES}</style>

      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--explore-and-have-fun</span>
      </h2>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Left column: bullets */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          <SlideItem delay={0.08}>
            <Emphasis color="green">warcraft-work-sounds</Emphasis> — a skill that adds
            {' '}Warcraft II <Emphasis color="orange">peon sounds</Emphasis> to your
            Claude Code session lifecycle
          </SlideItem>

          {revealStage === 1 && (
            <SlideItem delay={0} reveal>
              fetches .wav files from <Emphasis color="green">warcraft.wiki.gg</Emphasis>,
              {' '}organizes into 4 categories, and configures hooks automatically —
              {' '}one prompt is all it takes
            </SlideItem>
          )}
          {revealStage === 2 && (
            <SlideItem delay={0} reveal>
              <Emphasis color="orange">Notification</Emphasis> hook plays a random{' '}
              <Emphasis color="green">"what?"</Emphasis> when Claude needs permission —
              {' '}<Emphasis color="orange">Stop</Emphasis> hook plays{' '}
              <Emphasis color="green">"job's done!"</Emphasis> when session ends
              <Sound src={warcraftWhat} />
            </SlideItem>
          )}
          {revealStage === 3 && (
            <SlideItem delay={0} reveal>
              18 sounds across 4 categories — randomized playback, configurable
              volume, drop in new .wav files to customize
              <Sound src={warcraftComplete} />
            </SlideItem>
          )}
        </div>

        {/* Right column: code panels */}
        <div
          id="warcraft-right"
          style={{
            flex: 1,
          } as React.CSSProperties}
        >
          {revealStage === 0 && (
            <div key="0" className="warcraft-reveal">
              <CodeBlock language="bash" filename="warcraft-work-sounds/SKILL.md" code={SKILL_CODE} />
            </div>
          )}
          {revealStage === 1 && (
            <div key="1" className="warcraft-reveal">
              <CodeBlock language="bash" filename="warcraft-work-sounds/SKILL.md" code={SKILL_CODE} />
              <Sound src={warcraftYes} />
            </div>
          )}
          {revealStage === 2 && (
            <div key="2" className="warcraft-reveal">
              <CodeBlock language="json" filename="~/.claude/settings.json" code={HOOKS_CODE} />
            </div>
          )}
          {revealStage === 3 && (
            <div key="3" className="warcraft-reveal">
              <CodeBlock language="bash" filename="verification" code={VERIFY_CODE} />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export const WarcraftFunSlide: SlideDefinition = {
  id: 'warcraft-fun',
  maxRevealStages: 3,
  content: ({ revealStage }: SlideContentProps) => <WarcraftFunContent revealStage={revealStage} />,
  notes:
    'Fun example of explore-and-have-fun. Stage 0: skill overview + SKILL.md code. Stage 1: how it works + same code. Stage 2: hook config + "what?" sound plays. Stage 3: verification + "work complete" sound plays.',
};
