"use client";
import React from "react";

import noDataImg from "../../public/no-data-img.png";
import Image from "next/image";
import Button from "./ui/Button";
import ModalPortal from "./ui/ModalPortal";
import ModalContainer from "./ui/ModalContainer";
import ChatModal from "./ChatModal";
import { useModal } from "@/hook/useModal";

interface IProps {
  children: React.ReactNode;
}

export default function NoDataUi({ children }: IProps) {
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  return (
    <div className='flex flex-col items-center mt-[70px]'>
      <Image src={noDataImg} width={388} height={288} alt='no data' />
      <p className='text-center text-[#ffffff66] title2 pb-md'>{children}</p>
      <Button onClick={handleOpenMoal} classNames='w-[380px]'>
        모자와 회의 하러가기 →
      </Button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal handleCloseModal={handleCloseModal} isFrist={true} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
