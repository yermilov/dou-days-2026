import { SlideDefinition } from '../types/slides';

export const AutoApproveHookSlide: SlideDefinition = {
  id: 'auto-approve-hook',
  content: (
    <h2>
      <span className="text-dim">$</span>{' '}
      <span className="text-green">pattern</span>{' '}
      <span className="text-orange">--auto-approve-permissions</span>
    </h2>
  ),
};
