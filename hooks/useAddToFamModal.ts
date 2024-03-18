import { create } from "zustand";

interface AddToFamModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddToFamModal = create<AddToFamModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddToFamModal;
