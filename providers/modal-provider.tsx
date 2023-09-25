'use client'
import { useEffect, useState } from 'react'


import StoreModal from '@/components/modals/StoreModal'
import ToastProvider from './toast-provider'


export default function ModalProvider() {

    const [isMounted, setIsMounted] = useState(false)
    
    useEffect(() => { setIsMounted(true) }, [])

    if(!isMounted) return null
  return (
    <>
      <ToastProvider/>
      <StoreModal/>
    </>
  )
}
