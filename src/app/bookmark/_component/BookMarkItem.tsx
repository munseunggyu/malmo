"use client";
import React, { useState } from "react";
import Image from "next/image";

import icoStar from "../../../../public/ico-star-color.svg";
import icoDel from "../../../../public/ico-delete.svg";
import { IBookMark } from "./BookMarksList";
import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { constants, roleInfo } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function BookMarkItem({ ...bookMark }: IBookMark) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user = session?.user;

  const [showDelBtn, setShowDelBtn] = useState(false);
  const roleData = roleInfo(bookMark.role);

  const delBookMark = useMutation({
    mutationFn: () => {
      return fetch(constants.apiUrl + `chat/chat/${bookMark.aiMessageId}`, {
        method: "DELETE",
        headers: {
          "user-id": user?.id || ""
        }
      });
    },
    onSuccess() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach(queryKey => {
        if (queryKey[0] === "bookmark") {
          const bookmarkList = queryClient.getQueryData<IBookMark[]>([
            "bookmark"
          ]);
          const data = bookmarkList?.filter(
            item => item.aiMessageId !== bookMark.aiMessageId
          );
          console.log("bookmarkList", bookmarkList);
          console.log("data", data);

          queryClient.setQueryData(["bookmark"], data);
        }
      });
    }
  });

  return (
    <div className='max-w-[940px]'>
      <Image src={icoStar} alt='북마크' width={24} height={24} />
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
            {showDelBtn && (
              <button
                className='absolute top-[-60px] right-[-132px] flex items-center gap-x-[10px] bg-[#2D2D2F] border border-[#ffffff1a] caption1 w-[176px] py-[12px] rounded-sm text-start px-[16px] text-error-2'
                onClick={() => delBookMark.mutate()}
              >
                <Image src={icoDel} width={24} height={24} alt='로그아웃' />{" "}
                삭제하기
              </button>
            )}
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
          <p className='whitespace-pre-wrap break-keep overflow-scroll'>
            {bookMark.message}
          </p>
        </div>
      </div>
    </div>
  );
}
