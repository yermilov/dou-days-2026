interface Props {
  /** Zero-padded digit to display (e.g. "01"). */
  n: string;
}

/**
 * Sharp-edged rectangle with the DOU pink→violet vertical gradient and
 * centered bold digit. Used in agenda-style numbered lists (template slides 2–3).
 *
 * Size on 1920×1080 stage: ~113×83 px (5.88% × 7.75% of slide, matches template).
 */
export function NumberBadge({ n }: Props) {
  return <span className="number-badge">{n}</span>;
}
