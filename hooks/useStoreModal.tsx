import { create } from 'zustand'

interface IuseStoreModal {
    isOpen: boolean;
    Open: () => void;
    Close: () => void;
}

const useStoreModal = create<IuseStoreModal>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    Close: () => set({ isOpen: false }),
}))

export default useStoreModal