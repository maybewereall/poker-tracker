import { create } from 'zustand';

interface usePlayerModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePlayerModal = create<usePlayerModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))