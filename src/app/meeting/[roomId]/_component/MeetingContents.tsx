"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import AiComment from "./AiComment";
import Button from "@/components/ui/Button";
import { IMeetingRoomHat } from "../type/MeetingRoomHat";
import { useGptType } from "@/app/stores/gptType";

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
  const [showBlur, setShowBlur] = useState(true);
  const bottomOfPanelRef = useRef<HTMLDivElement>(null);

  const gptType = useGptType(state => state.gptType);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });
  useEffect(() => {
    if (inView) {
      setShowBlur(false);
    } else {
      setShowBlur(true);
    }
  }, [inView]);

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [hats]);

  return (
    <section
      className='border border-r-divider-1 border-l-0 border-y-0 relative'
      style={{
        flex: 274
      }}
    >
      <h3 className='border border-divider-1 border-r-0 px-[68px] py-[24px] subtitle1'>
        회의 공간
      </h3>
      <section
        className='pt-[40px] flex flex-col items-center'
        style={{
          height: "calc(100% - 80px)"
        }}
      >
        <ul className='flex flex-col gap-y-[12px] h-[75%] overflow-scroll'>
          <li className='max-w-[688px]'>
            <AiComment
              messages={hats[0].message}
              bookmarked={hats[0].bookmarked}
              aiMessageId={hats[0].aiMessageId}
              img={hats[0].img}
              thought={hats[0].thought}
              name={hats[0].name}
              characteristic={hats[0].characteristic}
              handleBookmark={handleBookmark}
              roomId={roomId}
            />
          </li>
          {hats[0].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[1].message}
                img={hats[1].img}
                bookmarked={hats[1].bookmarked}
                aiMessageId={hats[1].aiMessageId}
                thought={hats[1].thought}
                name={hats[1].name}
                characteristic={hats[1].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}
          {hats[1].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[2].message}
                img={hats[2].img}
                bookmarked={hats[2].bookmarked}
                aiMessageId={hats[2].aiMessageId}
                thought={hats[2].thought}
                name={hats[2].name}
                characteristic={hats[2].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}
          {hats[2].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[3].message}
                img={hats[3].img}
                bookmarked={hats[3].bookmarked}
                aiMessageId={hats[3].aiMessageId}
                thought={hats[3].thought}
                name={hats[3].name}
                characteristic={hats[3].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}
          {hats[3].isFinish && hats[4] && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[4].message}
                img={hats[4].img}
                bookmarked={hats[4].bookmarked}
                aiMessageId={hats[4].aiMessageId}
                thought={hats[4].thought}
                name={hats[4].name}
                characteristic={hats[4].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}
          {hats[4]?.isFinish && hats[5] && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[5].message}
                img={hats[5].img}
                bookmarked={hats[5].bookmarked}
                aiMessageId={hats[5].aiMessageId}
                thought={hats[5].thought}
                name={hats[5].name}
                characteristic={hats[5].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}
          {hats[5]?.isFinish && hats[6] && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[6].message}
                img={hats[6].img}
                bookmarked={hats[6].bookmarked}
                aiMessageId={hats[6].aiMessageId}
                thought={hats[6].thought}
                name={hats[6].name}
                characteristic={hats[6].characteristic}
                handleBookmark={handleBookmark}
                roomId={roomId}
              />
            </li>
          )}

          <li ref={ref} className='text-bg-1'>
            -
          </li>
          <li>
            <div ref={bottomOfPanelRef}></div>
          </li>
        </ul>
        {showBlur && (
          <div
            className='w-full h-[60px] relative top-[-60px]'
            style={{
              background:
                " linear-gradient(180deg, rgba(11, 16, 20, 0.00) 0%, #0B1014 100%)"
            }}
          ></div>
        )}
        <div className='absolute bottom-10 flex flex-col gap-[10px] items-center'>
          <div className='text-[#ffffff33]'>
            {gptType === "HYPER_CLOVA" ? "HyperCLOVA X" : "GPT-4o mini"}
          </div>
          {chatPhaseId3 === "undefined" && hats[6]?.isFinish && (
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
            말모말모를 실수할 수 있으며 중요한 정보는 다시 한번 확인하시길
            바랍니다.
          </p>
        </div>
      </section>
    </section>
  );
}
