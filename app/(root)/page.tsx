'use client'
import Modal from '@/components/ui/modal';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
  <main>
    <Modal
    title='Titel'
    description='Description' 
    isOpen={true} 
    onClose={() => {}}>

    </Modal>
    <UserButton afterSignOutUrl='/'/>
  </main>)

}
