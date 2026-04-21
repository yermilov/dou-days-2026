import { ReactNode } from 'react';

export interface SlideContentProps {
  revealStage: number;
  inputText: string;
  activatedTools: Set<string>;
}

export type HeroVariant = 'title' | 'speaker';

export interface SlideDefinition {
  id: string;
  content: ReactNode | ((props: SlideContentProps) => ReactNode);
  notes?: string;
  background?: string;
  tooltip?: ReactNode;
  maxRevealStages?: number;
  initialRevealStage?: number;
  hero?: boolean;
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
  hero?: boolean;
  heroVariant?: HeroVariant;
}

export interface SlideProgressProps {
  current: number;
  total: number;
}
