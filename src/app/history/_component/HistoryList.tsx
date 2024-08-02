"use client";

import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import NoDataUi from "@/components/NoDataUi";
import { getHistory } from "@/services/getHistory";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HistoryItem from "./HistoryItem";

export interface IHistory {
  id: string;
  roomName: string | null;
  phase: number;
}

export default function HistoryList({ userId }: { userId: string }) {
  const { data: historyList } = useQuery<IHistory[]>({
    queryKey: ["history"],
    queryFn: () => getHistory(userId),
    staleTime: 1000 * 60 * 5
  });

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
              className='flex py-[20px] border-b border-b-bg-3 items-center'
            >
              <HistoryItem {...history} />
            </li>
          ))}
      </ul>
    </section>
  );
}
