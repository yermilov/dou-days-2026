import { SlideDefinition } from '../types/slides';
import coworkImage from '../assets/cowork-reimbursments.png?url';

export const UltimateExampleSlide: SlideDefinition = {
  id: 'ultimate-example',
  content: () => (
    <div
      style={{
        // Break out of `.slide--body`'s 280px top / 60px bottom padding so the
        // image can claim the title-band space too. Stays clear of the chrome
        // (Київ badge ends at y≈111, DOU logo at y≈96).
        position: 'absolute',
        top: '130px',
        left: '60px',
        right: '60px',
        bottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={coworkImage}
        alt="Claude Chrome extension ordering lunch"
        loading="lazy"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: 'var(--input-border-radius)',
          border: '1px solid var(--terminal-border)',
          boxShadow: '0 8px 32px color-mix(in srgb, var(--dou-near-black) 60%, transparent)',
        }}
      />
    </div>
  ),
};
