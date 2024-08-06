"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { IMeetingRoomHat } from "../type/MeetingRoomHat";
import { MeetingContentsList } from "./MeetingContentsList";

interface IProps {
  hats: IMeetingRoomHat[];
  handleOpenMoal: () => void;
  chatPhaseId3: string;
  handleBookmark: (id: string) => void;
  loadingBtn: boolean;
  reStartAi: () => Promise<void>;
  nowIsStop: boolean;
  roomId: string;
}

export default function MeetingContents({
  hats,
  handleOpenMoal,
  chatPhaseId3,
  handleBookmark,
  loadingBtn,
  reStartAi,
  nowIsStop,
  roomId
}: IProps) {
  return (
    <section
      className='border border-r-divider-1 border-l-0 border-y-0 relative'
      style={{
        flex: 274
      }}
    >
      <h3 className='border border-divider-1 border-r-0 px-[68px] py-[16px] title3'>
        회의 공간
      </h3>
      <section
        className='pt-[40px] flex flex-col items-center'
        style={{
          height: "calc(100% - 80px)"
        }}
      >
        <MeetingContentsList
          hats={hats}
          handleBookmark={handleBookmark}
          roomId={roomId}
          loadingBtn={loadingBtn}
        />
        <div className='absolute bottom-10 flex flex-col gap-[10px] items-center'>
          {chatPhaseId3 === "undefined" && hats[6]?.isFinish && !loadingBtn && (
            <Button
              onClick={handleOpenMoal}
              classNames='w-[380px]'
              disabled={loadingBtn}
            >
              추가 회의하기
            </Button>
          )}
          {nowIsStop && (
            <Button
              onClick={reStartAi}
              classNames='w-[380px]'
              disabled={loadingBtn}
            >
              답변 재생산하기
            </Button>
          )}
          <p className='text-[12px] font-[400] text-[#ffffff66]'>
            말모말모는 실수할 수 있으며 중요한 정보는 다시 한번 확인하시길
            바랍니다.
          </p>
        </div>
      </section>
    </section>
  );
}
