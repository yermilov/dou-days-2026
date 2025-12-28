import { ReactNode } from 'react'

interface SlideProps {
  children: ReactNode
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
  notes?: string
  background?: string
  backgroundImage?: string
}

export function Slide({
  children,
  transition = 'slide',
  notes,
  background,
  backgroundImage
}: SlideProps) {
  return (
    <section
      data-transition={transition}
      data-background={background}
      data-background-image={backgroundImage}
    >
      {children}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  )
}
