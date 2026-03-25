'use client'
import React, { useState, useRef } from 'react'
import { Send, Paperclip, Mic, Loader } from 'lucide-react'
import { useSendMessage } from '@/features/chat/hooks/useChathook'
import { toast } from 'react-toastify'

const ChatInput = () => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { mutate: sendMessage, isPending } = useSendMessage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const formData = new FormData()
      formData.append('message', message)
      if (attachedFile) {
        formData.append('file', attachedFile)
      }

      sendMessage(formData, {
        onSuccess: () => {
          setMessage('')
          setAttachedFile(null)
          if (inputRef.current) {
            inputRef.current.style.height = 'auto'
          }
          toast.success('Message sent successfully!')
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || 'Failed to send message')
        },
      })
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

  const handleAttachFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAttachedFile(file)
      toast.info(`File attached: ${file.name}`)
    }
  }

  const removeAttachment = () => {
    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='w-full h-[15%] bg-linear-to-t from-slate-950 via-slate-900 to-transparent border-t border-slate-700 flex items-center justify-center px-6 py-4'>
      <div className='w-full max-w-3xl mx-auto'>
        {/* Attached File Display */}
        {attachedFile && (
          <div className='mb-3 flex items-center gap-2 p-3 bg-slate-800/40 border border-slate-700 rounded-lg'>
            <Paperclip size={16} className='text-blue-400' />
            <span className='text-sm text-slate-300 flex-1 truncate'>{attachedFile.name}</span>
            <button
              type='button'
              onClick={removeAttachment}
              className='text-slate-400 hover:text-slate-200 text-sm font-medium'
            >
              Remove
            </button>
          </div>
        )}
        
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
              onClick={handleAttachFile}
              disabled={isPending}
              className='p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed'
              title='Attach file'
            >
              <Paperclip size={20} />
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type='file'
              onChange={handleFileChange}
              className='hidden'
              disabled={isPending}
            />

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
                className='flex-1 bg-transparent text-slate-100 placeholder-slate-500 resize-none outline-none text-sm max-h-30 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent disabled:opacity-50'
                rows={1}
                disabled={isPending}
              />
            </div>

            {/* Voice Button */}
            <button
              type='button'
              disabled={isPending}
              className='p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg transition-colors duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed'
              title='Voice input'
            >
              <Mic size={20} />
            </button>

            {/* Send Button */}
            <button
              type='submit'
              disabled={!message.trim() || isPending}
              className='p-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 disabled:hover:shadow-none shrink-0 flex items-center justify-center'
              title='Send message'
            >
              {isPending ? <Loader size={20} className='animate-spin' /> : <Send size={20} />}
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