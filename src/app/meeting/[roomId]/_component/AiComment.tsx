import AiMessageLoading from "@/components/ui/AiMessageLoading";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { IHatInfo, IMeetingRoomHat } from "../type/MeetingRoomHat";

interface IProps extends IHatInfo {
  messages: string;
  handleBookmark: (id: string) => void;
  aiMessageId?: string;
  bookmarked: boolean;
}

export default function AiComment({
  messages,
  img,
  thought,
  name,
  characteristic,
  aiMessageId,
  bookmarked,
  handleBookmark
}: IProps) {
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
          {name} | {thought} {aiMessageId}
        </span>
        <p className='text-[#ffffff99] text-[14px] pt-[4px] pb-sm'>
          {characteristic}
        </p>
        {messages.length > 0 ? (
          <p className='whitespace-pre-wrap break-keep font-[400] w-[620px]'>
            {messages}
          </p>
        ) : (
          <p className='whitespace-pre-wrap break-keep font-[400] w-[620px] mx-auto flex justify-center'>
            <AiMessageLoading />
          </p>
        )}

        <div className='flex justify-end gap-x-xs mt-sm'>
          <button className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a]'>
            <span>추가 회의하기</span>
          </button>
          <button
            onClick={handleClickBookMark}
            className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a]'
          >
            저장하기 {bookmarked.toString()}
          </button>
        </div>
      </div>
    </div>
  );
}
