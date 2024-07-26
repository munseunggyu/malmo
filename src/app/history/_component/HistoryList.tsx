"use client";

import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import NoDataUi from "@/components/NoDataUi";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface IHistory {
  id: string;
  roomName: string | null;
  phase: number;
}

export default function HistoryList() {
  const queryClient = useQueryClient();
  const historyList = queryClient.getQueryData<IHistory[]>(["history"]);

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
              className='flex py-[29px] border-b border-b-bg-3'
            >
              <p className='max-w-[856px] w-full truncate'>
                {history.roomName || "-"}
              </p>
              <ol className='min-w-[305px] flex gap-x-xs ml-auto'>
                {Array.from({ length: history.phase }).map((_, index) => (
                  <li key={index}>
                    <MeetingPhaseButton
                      phase={String(index + 1)}
                      isOn={true}
                      roomId={history.id}
                    >
                      {index + 1}
                    </MeetingPhaseButton>
                  </li>
                ))}
              </ol>
            </li>
          ))}
      </ul>
    </section>
  );
}
