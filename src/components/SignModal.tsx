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
      className='rounded-md bg-bg-3 flex flex-col items-center justify-center w-[540px] h-[282px] relative'
      onClick={handleStopPropgation}
    >
      <button className='absolute top-4 right-4' onClick={handleCloseModal}>
        <Image src={closeImg} alt={"닫기"} width={24} height={24} />
      </button>
      <h3 className='text-[28px] font-[600]'>회원가입</h3>
      <p className='pt-[12px] pb-md text-[20px] font-[400] text-center'>
        간편하게 가입하고 <br />
        멋진 아이디어를 함께 만들어요!
      </p>
      <NaverLoginBtn />
    </div>
  );
}
