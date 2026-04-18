import { ReactNode } from 'react';

type Variant = 'mint' | 'violet' | 'magenta';

interface Props {
  children: ReactNode;
  variant?: Variant;
}

/**
 * Rounded pill used in flow-diagram slides (template slide 20). Fill comes
 * from one of the DOU accent tokens; text is bold white.
 */
export function FlowPill({ children, variant = 'mint' }: Props) {
  return <span className={`flow-pill flow-pill--${variant}`}>{children}</span>;
}
