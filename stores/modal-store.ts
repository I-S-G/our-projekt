import { create } from "zustand";

export type ModalType = "signin" | "signup";

export type ModalStore = {
  activeModal: ModalType | null;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,

  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
