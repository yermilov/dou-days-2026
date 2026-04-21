import { ReactNode } from 'react';

export interface SlideContentProps {
  revealStage: number;
  inputText: string;
  activatedTools: Set<string>;
}

export type HeroVariant = 'title' | 'speaker';

/**
 * Which chrome a slide renders:
 * - 'hero': calibrated 1920×1080 stage with pixel-perfect title-slide sonar + logo + Kyiv badge (TitleSlide)
 * - 'global' (default): 1920×1080 stage with randomised body-slide sonar + logo + Kyiv badge
 * - 'none': plain flow slide, no chrome (escape hatch, unused today)
 */
export type SlideChromeMode = 'hero' | 'global' | 'none';

export interface SlideDefinition {
  id: string;
  content: ReactNode | ((props: SlideContentProps) => ReactNode);
  notes?: string;
  background?: string;
  tooltip?: ReactNode;
  maxRevealStages?: number;
  initialRevealStage?: number;
  chrome?: SlideChromeMode;
  /** @deprecated use `chrome: 'hero'` — retained for in-flight migration. */
  hero?: boolean;
  /** @deprecated — only `'title'` remains in use; BioSlide (speaker) is reworked into a body slide. */
  heroVariant?: HeroVariant;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
}

export interface TerminalInputProps {
  onCommand: (command: string) => void;
  onInputChange?: (value: string) => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface PresentationProps {
  slides: SlideDefinition[];
  initialSlide?: number;
}

export interface SlideProps {
  children: ReactNode;
  isActive: boolean;
  notes?: string;
  background?: string;
  chrome?: SlideChromeMode;
  slideIndex?: number;
  slideId?: string;
  /** @deprecated use `chrome`. */
  hero?: boolean;
  /** @deprecated */
  heroVariant?: HeroVariant;
}

export interface SlideProgressProps {
  current: number;
  total: number;
}
