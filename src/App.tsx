import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'
import './styles/reveal-overrides.css'
import { Slide } from './components/Slide'

export default function App() {
  const deckRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const deck = new Reveal(deckRef.current!, {
      hash: true,
      transition: 'slide',
      width: 1920,
      height: 1080,
      margin: 0.1,
      center: true,
    })

    deck.initialize()

    return () => {
      deck.destroy()
    }
  }, [])

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        <Slide notes="Welcome everyone!">
          <h1>Pragmatic Vibe Clauding</h1>
          <p>Building with Claude Code</p>
        </Slide>

        <Slide>
          <h2>Getting Started</h2>
          <ul>
            <li>Navigate with arrow keys</li>
            <li>Press 'S' for speaker notes</li>
            <li>Press 'F' for fullscreen</li>
            <li>Press 'O' for overview</li>
          </ul>
        </Slide>

        <Slide>
          <h2>Add Your Content</h2>
          <p>Edit <code>src/App.tsx</code> to add your slides</p>
          <p>Use the <code>Slide</code> component for easy customization</p>
        </Slide>

        <Slide transition="zoom">
          <h2>Thank You!</h2>
          <p>Happy presenting!</p>
        </Slide>
      </div>
    </div>
  )
}
