import { Presentation } from './components/Presentation';
import { SlideDefinition } from './types/slides';
import './styles/theme.css';
import './styles/terminal.css';

// Import image so Vite handles the base path correctly
import yarikBadges from '/yarik-badges.jpg?url';

const slides: SlideDefinition[] = [
  {
    id: 'title',
    content: (
      <>
        <h1 className="hero">Прагматичний вайб клодінг</h1>
        <p>Ярослав Єрмілов, Principal Software Engineer @ Superhuman/Grammarly</p>
      </>
    ),
  },
  {
    id: 'bio',
    content: (
      <div className="bio-slide">
        <div className="bio-slide-content">
          <h2>8 років в греммерлі / суперхьюмані:</h2>
          <ul>
            <li>працював на бекенді</li>
            <li>лідив продуктові фічі</li>
            <li>техлідив платформену організацію</li>
            <li>зараз займаюся АІ-дев агентами</li>
          </ul>
          <p>
            пишу постійно в{' '}
            <a href="https://www.linkedin.com/in/yarik-yermilov/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
        <img
          src={yarikBadges}
          alt="Grammarly badges"
          className="bio-slide-image"
        />
      </div>
    ),
  },
];

export default function App() {
  return <Presentation slides={slides} />;
}
