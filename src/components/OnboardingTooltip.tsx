import { ReactNode } from 'react';

interface OnboardingTooltipProps {
  visible?: boolean;
}

export function OnboardingTooltip({ visible = true }: OnboardingTooltipProps) {
  if (!visible) return null;

  return (
    <div className="onboarding-tooltip">
      <div className="onboarding-tooltip-header">
        <span className="onboarding-tooltip-icon">?</span>
        <span className="onboarding-tooltip-title">Navigation</span>
      </div>
      <div className="onboarding-tooltip-grid">
        <div className="onboarding-tooltip-col">
          <div className="onboarding-tooltip-item">
            <code>next</code> or <code>n</code> - Next slide
          </div>
          <div className="onboarding-tooltip-item">
            <code>prev</code> or <code>p</code> - Previous slide
          </div>
        </div>
        <div className="onboarding-tooltip-col">
          <div className="onboarding-tooltip-item">
            <code>5</code> or number - Go to slide
          </div>
          <div className="onboarding-tooltip-item">
            <code>last</code> - Jump to last slide
          </div>
          <div className="onboarding-tooltip-item">
            Arrow keys work too!
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContextTooltipProps {
  visible?: boolean;
  children: ReactNode;
}

export function ContextTooltip({ visible = true, children }: ContextTooltipProps) {
  if (!visible) return null;

  return (
    <div className="onboarding-tooltip">
      {children}
    </div>
  );
}
