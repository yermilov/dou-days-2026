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

// Section header with color and size variants
export function SectionHeader({
  children,
  color,
  size = 'normal',
}: {
  children: string;
  color: 'green' | 'purple' | 'blue';
  size?: 'normal' | 'compact' | 'dense';
}) {
  const sizeClass = size === 'normal' ? '' : ` section-header--${size}`;
  return (
    <div className={`section-header section-header--${color}${sizeClass}`}>
      {'// '}
      {children}
    </div>
  );
}

// List item with size variants and animation
export function SlideItem({
  children,
  size = 'normal',
  delay,
}: {
  children: React.ReactNode;
  size?: 'normal' | 'compact' | 'dense';
  delay?: number;
}) {
  const sizeClass =
    size === 'normal' ? 'slide-item' : `slide-item slide-item--${size}`;
  const style: React.CSSProperties =
    delay !== undefined
      ? {
          opacity: 0,
          animation: 'slideItemFadeIn 0.35s ease-out forwards',
          animationDelay: `${delay}s`,
        }
      : {};

  return (
    <div className={sizeClass} style={style}>
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
