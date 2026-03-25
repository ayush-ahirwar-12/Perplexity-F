'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

const MainChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. How can I help you today? Feel free to ask me anything about React, TypeScript, Next.js, or any other topic.',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you explain React Hooks?',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      type: 'ai',
      content: 'React Hooks are functions that let you use state and other React features in functional components. The most common hooks are:\n\n1. **useState** - Manages state\n2. **useEffect** - Handles side effects\n3. **useContext** - Accesses context\n4. **useReducer** - Complex state logic\n5. **useCallback** - Memoizes callbacks\n6. **useMemo** - Memoizes values\n\nThey simplify code and make components more reusable. Would you like me to dive deeper into any of these?',
      timestamp: new Date(Date.now() - 200000),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={idx} className='font-semibold'>
            {line.replace(/\*\*/g, '')}
          </strong>
        )
      }
      if (line.startsWith('-') || line.match(/^\d+\./)) {
        return <div key={idx} className='ml-4'>{line}</div>
      }
      return <div key={idx}>{line}</div>
    })
  }

  return (
    <div className='w-full h-[85%] bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col'>
      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 px-6 py-8'>
        <div className='max-w-3xl mx-auto space-y-6'>
          {messages.length === 0 ? (
            <div className='h-full flex flex-col items-center justify-center text-center'>
              <div className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4'>
                Perplexity AI
              </div>
              <p className='text-slate-300 text-lg mb-8'>What would you like to know?</p>
              <div className='grid grid-cols-2 gap-4 w-full max-w-md'>
                {[
                  'Explain React Hooks',
                  'TypeScript Tips',
                  'Next.js Best Practices',
                  'Web Performance',
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    className='p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-slate-50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 text-sm'
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-2xl px-5 py-4 rounded-xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                  }`}
                >
                  <div className='text-sm leading-relaxed'>
                    {formatMessage(message.content)}
                  </div>
                  {message.type === 'ai' && (
                    <div className='flex items-center gap-2 mt-4 pt-3 border-t border-slate-700'>
                      <button
                        onClick={() => handleCopy(message.content, message.id)}
                        className='p-1.5 hover:bg-slate-700 rounded transition-colors duration-200 text-slate-400 hover:text-slate-200'
                        title='Copy'
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        className='p-1.5 hover:bg-slate-700 rounded transition-colors duration-200 text-slate-400 hover:text-green-400'
                        title='Helpful'
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        className='p-1.5 hover:bg-slate-700 rounded transition-colors duration-200 text-slate-400 hover:text-red-400'
                        title='Not helpful'
                      >
                        <ThumbsDown size={16} />
                      </button>
                      {copiedId === message.id && (
                        <span className='text-xs text-green-400 ml-2'>Copied!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}

export default MainChat