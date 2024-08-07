"use client";

import NoDataUi from "@/components/NoDataUi";
import React from "react";
import HistoryItem from "./HistoryItem";
import { useHistorykQuery } from "@/queries.ts/history";
import AiMessageLoading from "@/components/ui/AiMessageLoading";

export interface IHistory {
  id: number;
  roomName: string | null;
  phase: number;
}

export default function HistoryList({ userId }: { userId: string }) {
  const { data: historyList, isLoading } = useHistorykQuery(userId);

  if (isLoading) {
    return (
      <div className='flex justify-center mt-[250px]'>
        <AiMessageLoading />
      </div>
    );
  }

  if (historyList?.length === 0) {
    return (
      <NoDataUi>
        히스토리가 없어요!
        <br />
        회의하며 히스토리를 만들어 보아요.
      </NoDataUi>
    );
  }
  return (
    <section className='pt-[60px] max-w-[1197px] mx-auto'>
      <span className='text-[#ffffff99]'>최신순</span>

      <ul className='mt-[20px] border-t border-t-bg-3'>
        {historyList &&
          historyList.map(history => (
            <li
              key={history.id}
              className='flex py-[20px] border-b border-b-divider-1 items-center'
            >
              <HistoryItem {...history} />
            </li>
          ))}
      </ul>
    </section>
  );
}
