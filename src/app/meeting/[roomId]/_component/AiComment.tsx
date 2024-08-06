"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IHatInfo } from "../type/MeetingRoomHat";
import { useModal } from "@/hook/useModal";
import ModalPortal from "@/components/ui/ModalPortal";
import ModalContainer from "@/components/ui/ModalContainer";
import ChatModal from "@/components/ChatModal";
import { useSearchParams } from "next/navigation";

import starImg from "../../../../../public/ico-star-gray.svg";
import starWhiteImg from "../../../../../public/ico-star-white.svg";
import starColorImg from "../../../../../public/ico-star-color.svg";
import icoCopyImg from "../../../../../public/ico-copy.svg";
import icoCopyWhiteImg from "../../../../../public/ico-copy-white.svg";
import icoPlus from "../../../../../public/ico-plus.svg";
import MarkdownViewer from "@/components/ui/MarkdownViewer";
import SkeletonUi from "@/components/ui/SkeletonUi";
import toast, { Toaster } from "react-hot-toast";
import BubbleUi from "@/components/ui/BubbleUi";

interface IProps extends IHatInfo {
  messages: string;
  handleBookmark: (id: string) => void;
  aiMessageId?: string;
  bookmarked: boolean;
  roomId: string;
}

export default function AiComment({
  messages,
  img,
  thought,
  name,
  characteristic,
  aiMessageId,
  bookmarked,
  handleBookmark,
  roomId
}: IProps) {
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();
  const searchParams = useSearchParams();
  const phase = ((searchParams.get("phase") || "1") as "1") || "2" || "3";
  const handleClickBookMark = () => {
    if (!aiMessageId) return;
    let comment = bookmarked
      ? "해당 발언 저장을 취소하였습니다."
      : "해당 발언을 저장하였습니다.";

    toast(comment, { duration: 1000 });
    handleBookmark(aiMessageId);
  };

  const handleCopy = () => {
    toast("해당 발언을 복사하였습니다.", { duration: 1000 });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messages);
    }
  };

  const [bookMarkImg, setBookMarkImg] = useState(starImg);
  const [bookMarkBubble, setBookMarkBubble] = useState(false);

  const changeBookMarkImg = (type: number) => {
    if (type === 1) {
      setBookMarkBubble(true);
    } else {
      setBookMarkBubble(false);
    }
    if (bookmarked) return;
    // 1
    if (type === 1) {
      setBookMarkImg(starWhiteImg);
    } else {
      setBookMarkImg(starImg);
    }
  };
  const [copyImg, setCopyImg] = useState(icoCopyImg);

  const changeCopyImg = (type: number) => {
    if (type === 1) {
      setCopyImg(icoCopyWhiteImg);
    } else {
      setCopyImg(icoCopyImg);
    }
  };

  useEffect(() => {
    if (bookmarked) {
      setBookMarkImg(starColorImg);
    } else {
      setBookMarkImg(starImg);
    }
  }, [bookmarked]);

  return (
    <div className='flex gap-x-sm  w-full'>
      <Image
        src={img}
        alt={name}
        className='bg-blue-500 w-[50px] h-[50px] rounded-[50%]'
      />
      <div className='w-full'>
        <span>
          {name} | {thought}
        </span>
        <p className='text-[#ffffff99] text-[14px] pt-[4px] pb-sm'>
          {characteristic}
        </p>
        {messages.length > 0 ? (
          <MarkdownViewer content={messages}></MarkdownViewer>
        ) : (
          <>
            <SkeletonUi />
            <SkeletonUi className='w-[65%]' />
          </>
        )}

        <div className='flex justify-between items-center gap-x-[10px] mt-sm'>
          <div className='flex items-center'>
            <button
              onClick={handleCopy}
              className='rounded-full text-grey-9   box-border bg-inherit hover:bg-[#ffffff1a] relative'
              onMouseEnter={() => {
                changeCopyImg(1);
              }}
              onMouseLeave={() => {
                changeCopyImg(2);
              }}
            >
              <Image src={copyImg} width={24} height={24} alt='북마크' />
              {copyImg === icoCopyWhiteImg && (
                <BubbleUi className='w-[58px] left-[-18px]'>복사하기</BubbleUi>
              )}
            </button>
            <button
              onClick={handleClickBookMark}
              className='rounded-full text-grey-9  p-[4px] w-[24px] h-[24px] box-border bg-inherit hover:bg-[#ffffff1a] relative'
              onMouseEnter={() => {
                changeBookMarkImg(1);
              }}
              onMouseLeave={() => {
                changeBookMarkImg(2);
              }}
            >
              <Image src={bookMarkImg} width={16} height={16} alt='북마크' />
              {bookMarkBubble && (
                <BubbleUi className='w-[82px] left-[-28px]'>
                  인사이트 저장
                </BubbleUi>
              )}
            </button>
          </div>
          <button
            className='px-[12px] py-xs  opacity-[0.6] hover:opacity-[1] rounded-md text-[14px] flex justify-center items-center gap-2  border border-[#0b1014] hover:border-main'
            onClick={handleOpenMoal}
          >
            <span className='relative top-[1px]'>추가 회의하기</span>
            <Image src={icoPlus} alt='추가 회의하기' width={14} height={14} />
          </button>
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal
              phase={phase}
              roomId={roomId}
              handleCloseModal={handleCloseModal}
              chooseMessage={messages}
              relyAiMessageId={aiMessageId}
              name={name}
            />
          </ModalContainer>
        </ModalPortal>
      )}
      <Toaster
        position='bottom-center'
        toastOptions={{
          style: {
            color: "rgba(255, 255, 255, 0.60)",
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.10)0%, rgba(255, 255, 255, 0.10)100%), #2B2C22",
            minWidth: "500px"
          }
        }}
      />
    </div>
  );
}
