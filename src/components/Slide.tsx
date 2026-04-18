import { ReactNode } from 'react';

interface SlideProps {
  children: ReactNode;
  isActive?: boolean;
  notes?: string;
  background?: string;
}

export function Slide({
  children,
  isActive = true,
  background,
}: SlideProps) {
  if (!isActive) return null;

  return (
    <div
      className="slide"
      style={background ? { background } : undefined}
    >
      {children}
    </div>
  );
}
