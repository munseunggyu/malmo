"use client";

import Image from "next/image";
import React, { useState } from "react";
import icoNew from "../../public/ico-new.png";
import moveItem from "../../public/moveItem.svg";
import icoSetting from "../../public/ico-settings.svg";
import mainLogo from "../../public/logo-malmo.png";
import { signOut } from "next-auth/react";
import { useModal } from "@/hook/useModal";
import ModalPortal from "./ui/ModalPortal";
import ModalContainer from "./ui/ModalContainer";
import ChatModal from "./ChatModal";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useHoverChip } from "@/hook/useHoverChip";
import BubbleUi from "./ui/BubbleUi";

export default function Navbar() {
  const router = useRouter();
  const { openModal, handleCloseModal, handleOpenMoal } = useModal();
  const {
    isHover: isNewHover,
    handleMouseEnter: handleNewMouseEnter,
    handleMouseLeave: handleNewMouseLeave
  } = useHoverChip();
  const {
    isHover: isInsightHover,
    handleMouseEnter: handleInsightMouseEnter,
    handleMouseLeave: handleInsightMouseLeave
  } = useHoverChip();
  const {
    isHover: isHistoryHover,
    handleMouseEnter: handleHistoryMouseEnter,
    handleMouseLeave: handleHistoryMouseLeave
  } = useHoverChip();
  const [showSetting, setShowSetting] = useState(false);

  const segment = useSelectedLayoutSegment();

  const handleSignOut = () => {
    signOut({
      redirect: false
    }).then(() => {
      router.push("/");
      window.location.reload();
    });
  };
  return (
    <nav className='fixed flex flex-col bg-divider-1 h-full py-[20px] px-[4px] items-center'>
      <ul className='flex flex-col items-center px-[4px]'>
        <li>
          <Link href={"/"}>
            <Image src={mainLogo} alt='말모말모' width={48} height={48} />
          </Link>
        </li>
        <li className='pt-[24px] hover:opacity-[0.8] relative z-10'>
          <button
            onClick={handleOpenMoal}
            onMouseEnter={handleNewMouseEnter}
            onMouseLeave={handleNewMouseLeave}
          >
            <Image src={icoNew} width={48} height={48} alt='채팅 방 추가' />
          </button>
          {isNewHover && (
            <BubbleUi
              className='w-[51px] bg-[#ffffff33] bottom-[-30px] '
              color='black'
            >
              새 대화
            </BubbleUi>
          )}
        </li>
        <li
          className='pt-[20px] h-[64px]'
          onMouseEnter={handleInsightMouseEnter}
          onMouseLeave={handleInsightMouseLeave}
        >
          <Link
            href={"/bookmark"}
            className={` block w-[24px] h-[24px]  hover:bg-[url('/hoverStarImg.png')] hover:my-0 hover:w-[44px] hover:h-[44px] bg-cover bg-center relative ${
              segment === "bookmark"
                ? "w-[44px] h-[44px] bg-[url('/activeStarImg.png')] "
                : "bg-[url('/ico-star.svg')] my-[10px]"
            }`}
          >
            {isInsightHover && (
              <BubbleUi
                className='w-[58px] bg-[#ffffff33] bottom-[-30px] left-[-6px] z-10'
                color='black'
              >
                인사이트
              </BubbleUi>
            )}
          </Link>
        </li>
        <li
          className='pt-[12px]  h-[48px] '
          onMouseEnter={handleHistoryMouseEnter}
          onMouseLeave={handleHistoryMouseLeave}
        >
          <Link
            href={"/history"}
            className={`block w-[24px] h-[24px]  hover:bg-[url('/hoverHistoryImg.png')] hover:my-0 hover:w-[44px] hover:h-[44px] bg-cover bg-center relative ${
              segment === "history"
                ? "w-[44px] h-[44px] bg-[url('/activeHistoryImg.png')] my-0"
                : "bg-[url('/ico-historyfile.svg')] my-[10px] "
            }`}
          >
            {isHistoryHover && (
              <BubbleUi
                className='w-[58px] bg-[#ffffff33] bottom-[-30px] left-[-6px] z-10'
                color='black'
              >
                히스토리
              </BubbleUi>
            )}
          </Link>
        </li>
      </ul>
      <div className='mt-auto relative'>
        {showSetting && (
          <button
            onClick={handleSignOut}
            className='absolute top-[-57px] right-[-93px] flex items-center gap-x-[10px] bg-[#2D2D2F] border border-[#ffffff1a]   py-[12px] rounded-sm text-start px-[16px] hover:opacity-[0.8] text-[14px]'
          >
            <Image src={moveItem} width={24} height={24} alt='로그아웃' />{" "}
            로그아웃
          </button>
        )}
        <button
          onClick={() => setShowSetting(prev => !prev)}
          className='opacity-[0.6] hover:opacity-[1]'
        >
          <Image src={icoSetting} width={24} height={24} alt='설정' />
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
