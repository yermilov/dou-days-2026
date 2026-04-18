import { Presentation } from './components/Presentation';
import { slides } from './slides';
import './styles/theme.css';
import './styles/slides.css';

export default function App() {
  return <Presentation slides={slides} />;
}
