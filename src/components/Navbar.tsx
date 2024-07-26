"use client";

import Image from "next/image";
import React from "react";
import icoNew from "../../public/ico-new.svg";
import icoStar from "../../public/ico-star.svg";
import icoHistoryfile from "../../public/ico-historyfile.svg";
import icoSetting from "../../public/ico-settings.svg";
import { signOut } from "next-auth/react";
import { useModal } from "@/hook/useModal";
import ModalPortal from "./ui/ModalPortal";
import ModalContainer from "./ui/ModalContainer";
import ChatModal from "./ChatModal";

export default function Navbar() {
  const { openModal, handleCloseModal, handleOpenMoal } = useModal();

  const handleSignOut = () => {
    signOut({
      redirect: false
    }).then(() => {
      window.location.reload();
    });
  };
  return (
    <nav className='fixed flex flex-col bg-[#4f4f4f] h-full py-[20px] px-[10px] items-center'>
      <ul className='flex flex-col items-center '>
        <li>Logo</li>
        <li className='pt-[24px]'>
          <button onClick={handleOpenMoal}>
            <Image src={icoNew} width={64} height={64} alt='채팅 방 추가' />
          </button>
        </li>
        <li className='pt-[32px]'>
          <button>
            <Image src={icoStar} width={36} height={36} alt='즐겨찾기' />
          </button>
        </li>
        <li className='pt-[28px]'>
          <button>
            <Image src={icoHistoryfile} width={36} height={36} alt='폴더' />
          </button>
        </li>
      </ul>
      <div className='mt-auto'>
        <button onClick={handleSignOut}>
          <Image src={icoSetting} width={32} height={32} alt='설정' />
        </button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal handleCloseModal={handleCloseModal} isFrist={true} />
          </ModalContainer>
        </ModalPortal>
      )}
    </nav>
  );
}
