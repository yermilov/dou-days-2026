import { SlideDefinition } from '../types/slides';
import coworkImage from '/cowork-reimbursments.png?url';

export const UltimateExampleSlide: SlideDefinition = {
  id: 'ultimate-example',
  content: (
    <>
      <h2>ultimate example</h2>
      <div className="image-slide">
        <img src={coworkImage} alt="Ultimate example" loading="lazy" />
      </div>
    </>
  ),
};
