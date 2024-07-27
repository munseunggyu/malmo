"use client";

import React, { MouseEventHandler } from "react";
import NaverLoginBtn from "./NaverLoginBtn";

import closeImg from "../../public/ico-close.svg";
import Image from "next/image";

interface IProps {
  handleCloseModal: () => void;
}
export default function SignModal({ handleCloseModal }: IProps) {
  const handleStopPropgation: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
  };
  return (
    <div
      className='rounded-md bg-bg-3 flex flex-col items-center justify-center w-[540px] h-[300px] relative'
      onClick={handleStopPropgation}
    >
      <button className='absolute top-4 right-4' onClick={handleCloseModal}>
        <Image src={closeImg} alt={"닫기"} width={24} height={24} />
      </button>
      <h3 className='text-[24px] font-[600]'>말모말모 시작하기</h3>
      <p className='pt-[12px] mb-xs  text-[20px] font-[450] text-center'>
        말모말모와 함께 <br />
        멋진 아이디어를 함께 만들어요!
      </p>
      <p className='text-[#ffffff66] text-center mb-[12px]'>
        테스트용 ID로 진행됩니다.
        <br /> 버튼 클릭 후 Credentials 버튼을 클릭해 주세요.
      </p>
      <NaverLoginBtn />
    </div>
  );
}
