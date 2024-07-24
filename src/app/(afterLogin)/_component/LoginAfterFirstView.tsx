"use client";
import React from "react";
import GuideGrid from "./GuideGrid";
import CarouselUi from "@/components/ui/CarouselUi";
import ModalPortal from "@/components/ui/ModalPortal";
import ModalContainer from "@/components/ui/ModalContainer";
import ChatModal from "@/components/ChatModal";
import { useModal } from "@/hook/useModal";
import Button from "@/components/ui/Button";

export default function LoginAfterFirstView() {
  const { openModal, handleCloseModal, handleOpenMoal } = useModal();

  return (
    <div className='mt-[205px] mx-auto'>
      <h2 className='title1 leading-[130%] mb-xs'>
        당신의 아이디어를 더욱 빛나게!
      </h2>
      <p className='body1 leading-[130%] mb-[36px]'>
        당신의 아이디어를, 보다 멋지게 발전시켜드릴게요 어쩌구 저쩌구 모자 6개가
        어쩌구 저쩌구
      </p>
      <div className='flex gap-x-[12px]'>
        <GuideGrid />
        <CarouselUi containerClass={"max-w-[295px]"}>
          <div className='flex justify-center items-center'>1</div>
          <div className='flex justify-center items-center'>2</div>
          <div className='flex justify-center items-center'>3</div>
          <div className='flex justify-center items-center'>4</div>
          <div className='flex justify-center items-center'>5</div>
          <div className='flex justify-center items-center'>6</div>
        </CarouselUi>
      </div>
      <Button classNames='mt-md' onClick={handleOpenMoal}>
        모달 오픈 test
      </Button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
