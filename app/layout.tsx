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
  // You can replace these URLs with your custom sound files
  const sendSoundUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3'
  const receiveSoundUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-remove-2576.mp3'

  return (
    <html lang="en">
      <body>
        <CarrotChat sendSoundUrl={sendSoundUrl} receiveSoundUrl={receiveSoundUrl} />
      </body>
    </html>
  )
}

