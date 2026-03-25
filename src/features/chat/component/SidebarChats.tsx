'use client'
import React, { useState } from 'react'
import { Plus, Trash2, Settings } from 'lucide-react'

interface Chat {
  id: string
  title: string
  lastMessage?: string
  timestamp?: Date
}

const SidebarChats = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'Chat about React Hooks', lastMessage: 'How do I use useEffect?', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', title: 'TypeScript Best Practices', lastMessage: 'What are generics?', timestamp: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Next.js Performance', lastMessage: 'Static generation vs SSR...', timestamp: new Date(Date.now() - 172800000) },
  ])
  const [activeChat, setActiveChat] = useState<string>('1')

  const handleNewChat = () => {
    console.log('New chat clicked')
  }

  const handleDeleteChat = (id: string) => {
    setChats(chats.filter(chat => chat.id !== id))
  }

  const formatTime = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / 3600000)
    if (hours < 1) return 'Now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <aside className='h-full w-1/4 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 flex flex-col'>
      {/* Header */}
      <div className='p-4 border-b border-slate-700'>
        <button
          onClick={handleNewChat}
          className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20'
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chats List */}
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800'>
        <div className='p-3 space-y-2'>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeChat === chat.id
                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50'
                    : 'bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-slate-50 border border-slate-700/30'
                }`}
              >
                <div className='flex-1'>
                  <h3 className='text-sm font-medium truncate'>{chat.title}</h3>
                  <p className='text-xs text-slate-400 mt-1 truncate'>{chat.lastMessage}</p>
                  <p className='text-xs text-slate-500 mt-1'>{chat.timestamp && formatTime(chat.timestamp)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteChat(chat.id)
                  }}
                  className='opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-600/20 text-red-400 rounded transition-all duration-200'
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-slate-500'>
              <p className='text-sm'>No chats yet</p>
              <p className='text-xs mt-2'>Start a new conversation</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='p-4 border-t border-slate-700 space-y-2'>
        <button className='w-full flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-50 hover:bg-slate-700/30 rounded-lg transition-colors duration-200'>
          <Settings size={18} />
          <span className='text-sm'>Settings</span>
        </button>
        <div className='text-xs text-slate-500 text-center py-2'>
          Powered by AI
        </div>
      </div>
    </aside>
  )
}

export default SidebarChats