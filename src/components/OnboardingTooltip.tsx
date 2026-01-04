interface OnboardingTooltipProps {
  visible?: boolean;
}

export function OnboardingTooltip({ visible = true }: OnboardingTooltipProps) {
  if (!visible) return null;

  return (
    <div className="onboarding-tooltip">
      <div className="onboarding-tooltip-header">
        <span className="onboarding-tooltip-icon">?</span>
        <span className="onboarding-tooltip-title">Навігація</span>
      </div>
      <ul className="onboarding-tooltip-list">
        <li>
          <code>next</code> або <code>n</code> — Наступний слайд
        </li>
        <li>
          <code>prev</code> або <code>p</code> — Попередній слайд
        </li>
        <li>
          Число (напр. <code>5</code>) — Перейти до слайду
        </li>
        <li>Стрілки також працюють!</li>
      </ul>
    </div>
  );
}
