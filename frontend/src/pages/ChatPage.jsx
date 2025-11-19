import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const {logout} = useAuthStore();
  return (
    <div className='z-10'>
      <h1 className='text-white'>chatPage</h1>
      <button onClick={logout} className=''>LOGOUT</button>
    </div>
  )
}

export default ChatPage
