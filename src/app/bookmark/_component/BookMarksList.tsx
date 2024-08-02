"use client";
import React from "react";
import { IHat } from "@/types/Hat";
import NoDataUi from "@/components/NoDataUi";

import BookMarkItem from "./BookMarkItem";
import { useBookMarkQuery } from "@/queries.ts/bookmark";
import AiMessageLoading from "@/components/ui/AiMessageLoading";

export interface IBookMark {
  aiMessageId: number;
  message: string;
  phase: number;
  role: IHat;
  roomId: number;
  roomName: string;
  roomPhaseId: number;
}

export default function BookMarksList({ userId }: { userId: string }) {
  const { data: bookmarkList, isLoading } = useBookMarkQuery(userId);

  if (isLoading) {
    return (
      <div className='flex justify-center mt-[250px]'>
        <AiMessageLoading />
      </div>
    );
  }

  if (bookmarkList?.length === 0) {
    return (
      <NoDataUi>
        저장한 것이 없어요!
        <br />
        회의하며 저장공간을 채워보아요.
      </NoDataUi>
    );
  }

  return (
    <section className='pt-[60px] max-w-[940px] mx-auto pb-lg'>
      <span className='text-[#ffffff99]'>최신순</span>
      <ul className='mt-sm flex flex-col items-center gap-lg'>
        {bookmarkList?.map(bookMark => (
          <li key={bookMark.aiMessageId}>
            <BookMarkItem {...bookMark} />
          </li>
        ))}
      </ul>
    </section>
  );
}
