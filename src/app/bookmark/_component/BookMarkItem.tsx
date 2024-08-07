"use client";
import React, { useState } from "react";
import Image from "next/image";

import icoStar from "../../../../public/ico-star-color.svg";
import { IBookMark } from "./BookMarksList";
import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { roleInfo } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import MarkdownViewer from "@/components/ui/MarkdownViewer";
import DelButton from "@/components/ui/DelButton";
import { useBookMarkMutation } from "@/queries.ts/bookmark";

export default function BookMarkItem({ ...bookMark }: IBookMark) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = session?.user;

  const [showDelBtn, setShowDelBtn] = useState(false);
  const roleData = roleInfo(bookMark.role);

  const delBookMark = useBookMarkMutation({
    queryClient,
    userId: user?.id!,
    aiMessageId: bookMark.aiMessageId
  });

  const handleDel = () => {
    delBookMark.mutate();
  };

  return (
    <div>
      <Image src={icoStar} alt='북마크' width={16} height={15} />
      <div className='mt-sm py-sm px-md bg-bg-3 rounded-sm '>
        <div className='flex items-center mb-[20px]'>
          <p className='w-[80%] title2 truncate mr-[20px]'>
            {bookMark.roomName}
          </p>
          <MeetingPhaseButton
            phase={String(bookMark.phase)}
            isOn={true}
            roomId={String(bookMark.roomId)}
          >
            {bookMark.phase}
          </MeetingPhaseButton>
          <div className='relative ml-auto flex items-center'>
            <button
              className={`w-[44px] h-[44px]  bg-[url('/ico-control.svg')] hover:bg-[url('/ico-control-hover.svg')] ${
                showDelBtn
                  ? "bg-[url('/ico-control-hover.svg')]"
                  : "bg-[url('/ico-control.svg')]"
              }`}
              onClick={() => setShowDelBtn(prev => !prev)}
            />
            {showDelBtn && <DelButton left={2} handleClick={handleDel} />}
          </div>
        </div>
        <div className='border-t border-t-[#ffffff66] pt-[20px] flex '>
          <div className='flex min-w-[180px]'>
            <Image
              src={roleData.img}
              alt={roleData.name}
              width={24}
              height={24}
              className='mr-[11px] w-[24px] h-[24px]'
            />
            <span>
              {roleData.name} | {roleData.thought}
            </span>
          </div>
          <div className='overflow-scroll'>
            <MarkdownViewer content={bookMark.message} />
          </div>
        </div>
      </div>
    </div>
  );
}
