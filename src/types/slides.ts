import { ReactNode } from 'react';

export interface SlideContentProps {
  revealed: boolean;
  inputText: string;
}

export interface SlideDefinition {
  id: string;
  content: ReactNode | ((props: SlideContentProps) => ReactNode);
  notes?: string;
  background?: string;
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
}

export interface SlideProgressProps {
  current: number;
  total: number;
}

export type NavigationCommand =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'goto'; slideNumber: number };
