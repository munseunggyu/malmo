"use client";
import SignModal from "@/components/SignModal";
import Button from "@/components/ui/Button";
import ModalContainer from "@/components/ui/ModalContainer";
import ModalPortal from "@/components/ui/ModalPortal";
import { useModal } from "@/hook/useModal";
import React from "react";

export default function LoginModalBtn() {
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  return (
    <>
      <Button onClick={handleOpenMoal}>모자와 회의 하러가기 →</Button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <SignModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
