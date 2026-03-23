'use client'
import { RootState } from '@/config/store'
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
    <div>dashboard</div>
  )
}

export default page