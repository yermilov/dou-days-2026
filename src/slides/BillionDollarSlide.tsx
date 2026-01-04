import { SlideDefinition } from '../types/slides';
import billionDollarTweet from '/billion-dollar-tweet.png?url';

export const BillionDollarSlide: SlideDefinition = {
  id: 'billion-dollar',
  content: (
    <div className="image-slide">
      <img src={billionDollarTweet} alt="Tweet: ok claude, make a billion dollar b2b todo app" />
    </div>
  ),
};
