"use client";

import Image from "next/image";
import React from "react";
import icoNew from "../../public/ico-new.svg";
import icoStar from "../../public/ico-star.svg";
import icoHistoryfile from "../../public/ico-historyfile.svg";
import icoSetting from "../../public/ico-settings.svg";
import mainLogo from "../../public/logo-malmo.png";
import { signOut } from "next-auth/react";
import { useModal } from "@/hook/useModal";
import ModalPortal from "./ui/ModalPortal";
import ModalContainer from "./ui/ModalContainer";
import ChatModal from "./ChatModal";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Navbar() {
  const { openModal, handleCloseModal, handleOpenMoal } = useModal();

  const segment = useSelectedLayoutSegment();
  console.log(segment);

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
        <li>
          <Link href={"/"}>
            <Image src={mainLogo} alt='말모말모' width={64} height={64} />
          </Link>
        </li>
        <li className='pt-[24px] hover:opacity-[0.8]'>
          <button onClick={handleOpenMoal}>
            <Image src={icoNew} width={64} height={64} alt='채팅 방 추가' />
          </button>
        </li>
        <li className='pt-[20px] h-[64px] mb-2'>
          <Link
            href={"/star"}
            className={`my-[14px] block w-[36px] h-[36px]  hover:bg-[url('/hoverStarImg.png')] hover:my-0 hover:w-[64px] hover:h-[64px] bg-cover bg-center ${
              segment === "star"
                ? "w-[64px] h-[64px] bg-[url('/activeStarImg.png')] my-0"
                : "bg-[url('/ico-star.svg')]"
            }`}
          ></Link>
        </li>
        <li className='pt-[20px]  h-[64px]'>
          <Link
            href={"/history"}
            className={`my-[14px] block w-[36px] h-[36px]  hover:bg-[url('/hoverHistoryImg.png')] hover:my-0 hover:w-[64px] hover:h-[64px] bg-cover bg-center ${
              segment === "history"
                ? "w-[64px] h-[64px] bg-[url('/activeHistoryImg.png')] my-0"
                : "bg-[url('/ico-historyfile.svg')]"
            }`}
          ></Link>
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
