'use client'
import React, { useState, useRef } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

const ChatInput = () => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Message sent:', message)
      setMessage('')
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <div className='w-full h-[15%] bg-gradient-to-t from-slate-950 via-slate-900 to-transparent border-t border-slate-700 flex items-center justify-center px-6 py-4'>
      <div className='w-full max-w-3xl mx-auto'>
        <form onSubmit={handleSubmit} className='relative'>
          <div
            className={`flex items-end gap-3 p-4 rounded-2xl border transition-all duration-200 ${
              isFocused
                ? 'border-blue-500/50 bg-slate-800/50 shadow-lg shadow-blue-500/10'
                : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/40'
            }`}
          >
            {/* Attachment Button */}
            <button
              type='button'
              className='p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 flex-shrink-0'
              title='Attach file'
            >
              <Paperclip size={20} />
            </button>

            {/* Input Area */}
            <div className='flex-1 flex items-center'>
              <textarea
                ref={inputRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Ask anything... (Shift + Enter for new line)'
                className='flex-1 bg-transparent text-slate-100 placeholder-slate-500 resize-none outline-none text-sm max-h-30 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent'
                rows={1}
              />
            </div>

            {/* Voice Button */}
            <button
              type='button'
              className='p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 flex-shrink-0'
              title='Voice input'
            >
              <Mic size={20} />
            </button>

            {/* Send Button */}
            <button
              type='submit'
              disabled={!message.trim()}
              className='p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 disabled:hover:shadow-none flex-shrink-0'
              title='Send message'
            >
              <Send size={20} />
            </button>
          </div>
        </form>

        {/* Helper Text */}
        <div className='text-xs text-slate-500 mt-2 text-center'>
          AI can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  )
}

export default ChatInput