'use client'
import useStoreModal from '@/hooks/useStoreModal';
import { UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Home() {

  const Open = useStoreModal((state) => state.Open)
  
  const isOpen = useStoreModal((state) => state.isOpen)
  
  useEffect(() => {
    if(!isOpen)
      Open()
  }, [Open, isOpen])
  return (
  <main className='p-4'>
    <UserButton afterSignOutUrl='/'/>
  </main>)

}
