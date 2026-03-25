'use client'
import { RootState } from '@/config/store'
import ChatInput from '@/features/chat/component/ChatInput';
import MainChat from '@/features/chat/component/MainChat';
import SidebarChats from '@/features/chat/component/SidebarChats';
import { useChat } from '@/features/chat/hooks/useChathook';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state:RootState)=>state.auth.user);
  const chat = useChat();

  useEffect(()=>{
    chat.initializeSocketConnection();
  },[])

  
  return (
    <main className='w-full h-screen flex bg-mauve-900'>
      <SidebarChats/>
      <section className='w-full h-screen'>
          <MainChat/>
          <ChatInput/>
      </section>
    </main>
    
  )
}

export default page