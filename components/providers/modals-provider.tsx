"use client";

import { useModalStore } from "@/stores/modal-store";
import SignInModal from "../modals/signInModal";
import SignUpModal from "../modals/signUpModal";

export default function ModalProvider() {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal === "signin" && <SignInModal />}
      {activeModal === "signup" && <SignUpModal />}
    </>
  );
}
