import React from 'react'
import Modal from '@/components/ui/modal'
import useStoreModal from '@/hooks/useStoreModal'

export default function StoreModal() {
    const storeModal = useStoreModal()
  return (
    <Modal
    title='Store Modal'
    description='Description'
    isOpen={storeModal.isOpen}
    onClose={storeModal.Close}
    >
        StoreModal
    </Modal>
  )
}
