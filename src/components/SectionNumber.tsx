interface Props {
  /** Zero-padded number to display inside the donut (e.g. "01"). */
  n: string;
}

/**
 * Magenta donut with a centered section number. Reproduces the template's
 * section-divider slides (slide 4 in the DOU dark deck).
 *
 * Rendered as SVG so stroke ratios stay exact when scaled by the stage.
 * Outer diameter matches 133px on a 987×555 preview slide = ~13.5% of slide
 * width; here we target 260px inside the 1920×1080 stage (same proportion).
 */
export function SectionNumber({ n }: Props) {
  const size = 260;
  const outerR = size / 2;
  const strokeRatio = 0.22; // stroke ≈ 22% of outer radius — measured on template
  const stroke = outerR * strokeRatio;
  const innerR = outerR - stroke;

  return (
    <svg
      className="section-number"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        fill="var(--dou-magenta)"
        d={`M ${outerR},0
            a ${outerR},${outerR} 0 1,0 0,${size}
            a ${outerR},${outerR} 0 1,0 0,-${size}
            Z
            M ${outerR},${outerR - innerR}
            a ${innerR},${innerR} 0 1,1 0,${innerR * 2}
            a ${innerR},${innerR} 0 1,1 0,-${innerR * 2}
            Z`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-sans)"
        fontWeight={700}
        fontSize={size * 0.32}
        fill="var(--dou-white)"
      >
        {n}
      </text>
    </svg>
  );
}
