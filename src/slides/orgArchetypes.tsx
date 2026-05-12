import type { ReactNode } from 'react';
import { Emphasis } from '../components/SlideElements';

// Shared archetype metadata used by both EveryOrgRightNowSlide (bell-curve
// overview) and GrowOrgSlide (growth playbook). Colors and ordering match
// the bell curve's left-to-right axis.
export interface OrgSection {
  key: string;
  label: string;
  color: string;
  glowColor: string;
  x1Pct: number;
  x2Pct: number;
  items: ReactNode[];
  growItems: ReactNode[];
}

export const ORG_SECTIONS: OrgSection[] = [
  {
    key: 'multipliers',
    label: 'мультиплікатори',
    color: '#f0883e',
    glowColor: 'rgba(240,136,62,0.4)',
    x1Pct: 0,
    x2Pct: 0.18,
    items: [
      'масштабують AI на команди',
      'пишуть скіли, плагіни, інструменти',
      'будують software factories',
    ],
    growItems: [
      '1–2 на компанію, щоб запустити процес',
      <>антипатерн <Emphasis color="orange">«AI-enablement team»</Emphasis> з блюпринтами — краще будуйте AI-інфраструктуру</>,
    ],
  },
  {
    key: 'engineers',
    label: 'AI-first інженери',
    color: '#7ee787',
    glowColor: 'rgba(126,231,135,0.35)',
    x1Pct: 0.18,
    x2Pct: 0.42,
    items: [
      'досліджують плагіни та скіли',
      'пробують нові підходи',
      'end-to-end agentic engineering',
      'делегують високорівневі задачі ai',
    ],
    growItems: [
      '1–2 в команду, щоб запустити процес',
      'дайте простір і час експериментувати',
      'з’єднуйте успішних між командами',
      'популяризуйте роботу — demos, fun days, slack',
    ],
  },
  {
    key: 'majority',
    label: 'консервативна більшість',
    color: '#79c0ff',
    glowColor: 'rgba(121,192,255,0.3)',
    x1Pct: 0.42,
    x2Pct: 0.74,
    items: [
      'генерують методи і тести',
      'досліджують кодбази з AI-агентами',
      'vibe-code у незнайомих стеках',
      '«поясни, що робить X»',
    ],
    growItems: [
      <>антипатерн <Emphasis color="orange">«AI згори»</Emphasis> — мандати від керівництва не працюють</>,
    ],
  },
  {
    key: 'deniers',
    label: 'AI-скептики',
    color: '#d2a8ff',
    glowColor: 'rgba(210,168,255,0.3)',
    x1Pct: 0.74,
    x2Pct: 1,
    items: [
      '«ще не пробував»',
      '«пробував, не вийшло»',
      '«я швидший без нього»',
      '«це просто хайп з LinkedIn»',
    ],
    growItems: [],
  },
];
