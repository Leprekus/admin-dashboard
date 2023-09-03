'use client'
import useStoreModal from '@/hooks/useStoreModal';
import { useEffect } from 'react';

export default function Home() {

  const Open = useStoreModal((state) => state.Open)
  
  const isOpen = useStoreModal((state) => state.isOpen)
  
  useEffect(() => {
    if(!isOpen)
      Open()
  }, [Open, isOpen])
  return null

}
