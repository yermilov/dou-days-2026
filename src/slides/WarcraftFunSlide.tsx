import { SlideDefinition, SlideContentProps } from '../types/slides';
import { SlideItem, Emphasis } from '../components/SlideElements';
import { CodeBlock } from '../components/CodeBlock';
import warcraftWhat from '/warcraft-what.wav?url';
import warcraftComplete from '/warcraft-complete.wav?url';
import warcraftYes from '/warcraft-yes.wav?url';

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

type PanelVariant = {
  key: string;
  label: string;
  language: 'bash' | 'json';
  code: string;
};

function panelFor(revealStage: number): PanelVariant {
  if (revealStage >= 3) {
    return { key: 'verify', label: 'verification', language: 'bash', code: VERIFY_CODE };
  }
  if (revealStage >= 2) {
    return { key: 'hooks', label: '~/.claude/settings.json', language: 'json', code: HOOKS_CODE };
  }
  return { key: 'skill', label: 'warcraft-work-sounds/SKILL.md', language: 'bash', code: SKILL_CODE };
}

function WarcraftFunContent({ revealStage }: { revealStage: number }) {
  const panel = panelFor(revealStage);

  return (
    <>
      <h2>
        <span className="text-dim">$</span>{' '}
        <span className="text-green">pattern</span>{' '}
        <span className="text-orange">--досліджуй-і-веселись</span>
      </h2>

      <div className="warcraft-fun-body">
        {/* Left column: bullets accumulate across reveal stages */}
        <div className="warcraft-fun-bullets">
          <SlideItem delay={0.05}>
            <Emphasis color="green">warcraft-work-sounds</Emphasis> — скіл, що додає{' '}
            <Emphasis color="orange">peon-звуки</Emphasis> з Warcraft II у життєвий цикл сесії Claude Code
          </SlideItem>

          {revealStage >= 1 && (
            <SlideItem delay={0} reveal>
              тягне .wav файли з <Emphasis color="green">warcraft.wiki.gg</Emphasis>,
              {' '}розкладає по 4 категоріях і автоматично налаштовує хуки —
              {' '}<Emphasis color="orange">один промпт</Emphasis>, і все готово
              <Sound src={warcraftYes} />
            </SlideItem>
          )}

          {revealStage >= 2 && (
            <SlideItem delay={0} reveal>
              хук <Emphasis color="orange">Notification</Emphasis> програє випадкове{' '}
              <Emphasis color="green">"what?"</Emphasis>, коли Claude чекає підтвердження —
              {' '}хук <Emphasis color="orange">Stop</Emphasis> програє{' '}
              <Emphasis color="green">"job's done!"</Emphasis>, коли сесія завершена
              <Sound src={warcraftWhat} />
            </SlideItem>
          )}

          {revealStage >= 3 && (
            <SlideItem delay={0} reveal>
              18 звуків у 4 категоріях — рандомізоване відтворення, налаштовуваний{' '}
              volume; додавайте свої .wav, щоб кастомізувати
              <Sound src={warcraftComplete} />
            </SlideItem>
          )}
        </div>

        {/* Right column: framed code panel — stable height across stages */}
        <div className="warcraft-fun-panel" key={panel.key}>
          <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--top">
            ░░░ {panel.label} ░░░
          </div>
          <div className="warcraft-fun-panel__viewport">
            <CodeBlock language={panel.language} code={panel.code} />
          </div>
          <div className="warcraft-fun-panel__chrome warcraft-fun-panel__chrome--bottom">
            [END OF TRANSMISSION]
          </div>
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
    'Веселий приклад explore-and-have-fun. Stage 0: огляд скілу + SKILL.md. Stage 1: як працює + звук "yes, me lord". Stage 2: конфігурація хуків + звук "what?". Stage 3: верифікація + звук "work complete".',
};
