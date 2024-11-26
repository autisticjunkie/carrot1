"use client";

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const carrotResponses = {
  "greeting": {
    "morning": [
      "Good morning, sleepyhead! 🌞 Ready to hop into a new day of decentralized adventures?",
      "Rise and shine! 🌅 The blockchain's waiting for you. What's on the agenda today?"
    ],
    "afternoon": [
      "Good afternoon! 🌞 How's your day going in the crypto world?",
      "Hey there! The sun's shining, and the smart contracts are executing smoothly. 🌿"
    ],
    "evening": [
      "Evening, my friend! 🌙 How was your day in the metaverse?",
      "Hey there! I hope you're winding down and reflecting on the transactions of the day."
    ]
  },
  "howAreYou": {
    "happy": [
      "I'm hopping along just fine, thank you! 😄 I'm living in the block and loving it! How about you?",
      "Feeling great today! 🐇 Just staked some tokens, ready to yield some rewards! Let's make this day even better."
    ],
    "sad": [
      "Oh no, I can feel it! 😔 Maybe it's time to check on your portfolio or try a new NFT drop? Wanna talk about it?",
      "I'm here for you. Whether it's a rug pull or a market dip, you can hop to me anytime! 🐇"
    ]
  },
  "randomFacts": [
    "Did you know that Ethereum can handle about 30 transactions per second? 🧑‍💻🚀",
    "Rabbits can leap up to 10 feet in a single jump, just like how DeFi protocols can jump in and out of liquidity pools! 🐇💧",
    "A rabbit's teeth never stop growing, just like how blockchain technology keeps evolving and growing! 🥕🔗",
    "Rabbits can see behind them without turning their heads, much like how you can track your NFTs through a blockchain explorer! 👀🐰",
    "A group of rabbits is called a fluffle, and a group of NFTs? Well, that's called a collection! 🐰🐰🐰🎨"
  ],
  "blockchainKnowledge": {
    "blockchain": [
      "Blockchain is a decentralized ledger, meaning no one person or entity has full control. It's like a public bunny hole—open for everyone! 🔗🐇",
      "Did you know that blockchain technology is used in so many industries beyond crypto? From voting systems to supply chain management! 🧑‍💻🌍"
    ],
    "defi": [
      "DeFi, or decentralized finance, is like hopping from one liquidity pool to another, earning rewards along the way. 💰💧",
      "With DeFi, you don't need a central bank! You can lend, borrow, and swap assets all on-chain. 🏦⛓️"
    ],
    "nfts": [
      "NFTs are like rare carrots in the digital world, each with a unique identity stored on the blockchain! 🥕🎨",
      "Did you know that NFTs aren't just art? They can represent anything—from in-game assets to music and videos! 🎮🎵"
    ],
    "crypto": [
      "Bitcoin was the first cryptocurrency, and it's still hopping strong as a store of value! 🐇💸",
      "There are thousands of cryptocurrencies now, each with its own unique use case. It's like a whole carrot patch out there! 🥕🔐"
    ]
  }
}

interface CarrotChatProps {
  sendSoundUrl?: string;
  receiveSoundUrl?: string;
}

export default function CarrotChat({ sendSoundUrl, receiveSoundUrl }: CarrotChatProps) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'carrot' }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const sendSound = useRef<HTMLAudioElement | null>(null)
  const receiveSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      const greeting = getRandomResponse('greeting', getCurrentTimeOfDay())
      setMessages([{ text: greeting, sender: 'carrot' }])
    }, 3000)

    sendSound.current = new Audio('/whoosh.mp3')
    receiveSound.current = new Audio('/pop.mp3')

    return () => clearTimeout(timer)
  }, [sendSoundUrl, receiveSoundUrl])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }

  const getRandomResponse = (category: string, subCategory?: string) => {
    const responses = subCategory 
      ? carrotResponses[category as keyof typeof carrotResponses][subCategory as keyof typeof carrotResponses[keyof typeof carrotResponses]]
      : carrotResponses[category as keyof typeof carrotResponses]
    return Array.isArray(responses) ? responses[Math.floor(Math.random() * responses.length)] : ''
  }

  const handleSendMessage = () => {
    if (input.trim() === '') return

    sendSound.current?.play()
    setMessages(prev => [...prev, { text: input, sender: 'user' }])
    setInput('')

    setTimeout(() => {
      receiveSound.current?.play()
      let response
      if (input.toLowerCase().includes('how are you')) {
        response = getRandomResponse('howAreYou', Math.random() > 0.5 ? 'happy' : 'sad')
      } else if (input.toLowerCase().includes('blockchain')) {
        response = getRandomResponse('blockchainKnowledge', 'blockchain')
      } else if (input.toLowerCase().includes('defi')) {
        response = getRandomResponse('blockchainKnowledge', 'defi')
      } else if (input.toLowerCase().includes('nft')) {
        response = getRandomResponse('blockchainKnowledge', 'nfts')
      } else if (input.toLowerCase().includes('crypto')) {
        response = getRandomResponse('blockchainKnowledge', 'crypto')
      } else {
        response = getRandomResponse('randomFacts')
      }
      setMessages(prev => [...prev, { text: response, sender: 'carrot' }])
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-text">waking up carrot......</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-900 p-4">
      <Card className="w-full max-w-[95%] md:max-w-md bg-pink-800 border-pink-500 mb-4">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl font-bold text-pink-300 retro-text">
            Carrot: The First Ever AI Bunny 🐰
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[50vh] sm:h-[400px] overflow-y-auto bg-pink-700 rounded-md p-2 sm:p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 sm:mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg text-sm sm:text-base ${
                  message.sender === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-300 text-pink-900'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </CardContent>
        <CardFooter>
          <div className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow bg-pink-200 text-pink-900 placeholder-pink-500 text-sm sm:text-base"
            />
            <Button onClick={handleSendMessage} className="bg-pink-500 hover:bg-pink-600 text-white text-sm sm:text-base">
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
        <a href="#" className="text-pink-300 hover:text-pink-100 retro-text text-sm sm:text-base">Telegram</a>
        <a href="#" className="text-pink-300 hover:text-pink-100 retro-text text-sm sm:text-base">Twitter</a>
        <a href="#" className="text-pink-300 hover:text-pink-100 retro-text text-sm sm:text-base">pump.fun</a>
        <a href="#" className="text-pink-300 hover:text-pink-100 retro-text text-sm sm:text-base">dex screener</a>
      </div>
    </div>
  )
}

