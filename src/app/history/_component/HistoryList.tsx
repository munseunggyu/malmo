"use client";

import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function HistoryList() {
  const queryClient = useQueryClient();
  const history = queryClient.getQueryData(["history"]);
  console.log(history);
  return (
    <ul className='mt-[20px] border-t border-t-bg-3'>
      <li className='flex py-[29px] border-b border-b-bg-3'>
        <p className='max-w-[856px] w-full truncate'>
          아이디어 토픽 요약 자동 생성 아이디어 토픽 요약 자동 생성 아이디어
          토픽 아이디어 토픽 요약 자동 생성 아이디어 토픽 요약 자동 생성
          아이디어 토픽 아이디어 토픽 요약 자동 생성 아이디어 토픽 요약 자동
          생성 아이디어 토픽
        </p>
        <div className='min-w-[300px] flex gap-x-xs ml-auto'>
          <div>
            <MeetingPhaseButton phase={"1"} isOn={true}>
              1
            </MeetingPhaseButton>
          </div>
          <div>
            <MeetingPhaseButton phase={"1"} isOn={true}>
              2
            </MeetingPhaseButton>
          </div>
          <div>
            <MeetingPhaseButton phase={"1"} isOn={true}>
              3
            </MeetingPhaseButton>
          </div>
        </div>
      </li>
    </ul>
  );
}
