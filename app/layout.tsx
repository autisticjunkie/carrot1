import './globals.css'
import type { Metadata } from 'next'
import CarrotChat from './page'

export const metadata: Metadata = {
  title: 'Carrot: The First Ever AI Bunny',
  description: 'A retro BBS-styled chatbot with a pink theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sendSoundUrl = 'whoosh.mp3'
  const receiveSoundUrl = 'pop.mp3'

  return (
    <html lang="en">
      <body>
        {children}  {/* Use children instead of CarrotChat component */}
      </body>
    </html>
  )
}

