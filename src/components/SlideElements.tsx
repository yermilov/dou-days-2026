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

// Section header with color variants (DOU: no // prefix)
export function SectionHeader({
  children,
  color,
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
}) {
  return (
    <div className={`section-header section-header--${color}`}>
      {children}
    </div>
  );
}

// List item with animation
export function SlideItem({
  children,
  delay,
  reveal = false,
}: {
  children: React.ReactNode;
  delay?: number;
  reveal?: boolean;
}) {
  const style: React.CSSProperties =
    delay !== undefined
      ? {
          opacity: 0,
          animation: `${reveal ? 'slideItemReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : 'slideItemFadeIn 0.35s ease-out'} forwards`,
          animationDelay: `${delay}s`,
        }
      : {};

  return (
    <div className="slide-item" style={style}>
      <span className="slide-item__prefix">•</span>
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
