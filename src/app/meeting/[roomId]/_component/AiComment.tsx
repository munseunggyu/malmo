import AiMessageLoading from "@/components/ui/AiMessageLoading";
import Image from "next/image";
import React from "react";
import { IHatInfo } from "../type/MeetingRoomHat";
import { useModal } from "@/hook/useModal";
import ModalPortal from "@/components/ui/ModalPortal";
import ModalContainer from "@/components/ui/ModalContainer";
import ChatModal from "@/components/ChatModal";
import { useSearchParams } from "next/navigation";

import starImg from "../../../../../public/ico-star.svg";
import starColorImg from "../../../../../public/ico-star-color.svg";
import MarkdownViewer from "@/components/ui/MarkdownViewer";

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
    handleBookmark(aiMessageId);
  };
  return (
    <div className='flex gap-x-sm '>
      <Image
        src={img}
        alt={name}
        className='bg-blue-500 w-[50px] h-[50px] rounded-[50%]'
      />
      <div>
        <span>
          {name} | {thought}
        </span>
        <p className='text-[#ffffff99] text-[14px] pt-[4px] pb-sm'>
          {characteristic}
        </p>
        {messages.length > 0 ? (
          <MarkdownViewer content={messages}></MarkdownViewer>
        ) : (
          <p className='whitespace-pre-wrap break-keep font-[400] w-[620px] mx-auto flex justify-center'>
            <AiMessageLoading />
          </p>
        )}

        <div className='flex justify-end gap-x-xs mt-sm'>
          <button className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a]'>
            <span onClick={handleOpenMoal}>추가 회의하기</span>
          </button>
          <button
            onClick={handleClickBookMark}
            className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a] flex items-center gap-x-xs'
          >
            <Image
              src={bookmarked ? starColorImg : starImg}
              width={20}
              height={20}
              alt='북마크'
            />{" "}
            저장하기
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
    </div>
  );
}
