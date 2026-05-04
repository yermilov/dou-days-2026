import React from 'react';

// Inline code with color variants
export function Code({
  children,
  variant = 'cyan',
}: {
  children: string;
  variant?: 'cyan' | 'orange' | 'green';
}) {
  const className =
    variant === 'cyan' ? 'code-inline' : `code-inline code-inline--${variant}`;
  return <code className={className}>{children}</code>;
}

// Section header with color variants
export function SectionHeader({
  children,
  color,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
}) {
  return (
    <div className={`section-header section-header--${color}`}>
      {'// '}
      {children}
    </div>
  );
}

// List item with animation
export type SlideItemRevealVariant = 'fade' | 'up' | 'scale' | 'left' | 'blur';

const REVEAL_KEYFRAMES: Record<SlideItemRevealVariant, string> = {
  fade: 'slideItemFadeIn',
  up: 'slideItemRevealUp',
  scale: 'slideItemRevealScale',
  left: 'slideItemReveal',
  blur: 'slideItemRevealBlur',
};

export function SlideItem({
  children,
  delay,
  reveal = false,
  revealAs,
}: {
  children: React.ReactNode;
  /** Animation delay in **seconds** (note: not milliseconds). */
  delay?: number;
  /** Legacy boolean — `true` picks the slightly-stronger `left` variant. */
  reveal?: boolean;
  /** Explicit motion mode. Falls back to `left` if `reveal` is true, else `fade`. */
  revealAs?: SlideItemRevealVariant;
}) {
  const variant: SlideItemRevealVariant = revealAs ?? (reveal ? 'left' : 'fade');
  const style: React.CSSProperties =
    delay !== undefined
      ? {
          opacity: 0,
          animation: `${REVEAL_KEYFRAMES[variant]} 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards`,
          animationDelay: `${delay}s`,
        }
      : {};

  return (
    <div className="slide-item" style={style}>
      <span className="slide-item__prefix">&gt;</span>
      <span>{children}</span>
    </div>
  );
}

// Styled quote text
export function Quote({ children }: { children: React.ReactNode }) {
  return <span className="text-quote">'{children}'</span>;
}

// Emphasized text with color variant
export function Emphasis({
  children,
  color = 'green',
}: {
  children: string;
  color?: 'orange' | 'green';
}) {
  return (
    <span className={`text-emphasis text-emphasis--${color}`}>{children}</span>
  );
}

// External link styled for slides
export function SlideLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="slide-link"
    >
      {children}
    </a>
  );
}
