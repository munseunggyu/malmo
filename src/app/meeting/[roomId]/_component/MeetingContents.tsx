"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import AiComment from "./AiComment";
import Button from "@/components/ui/Button";
import { IMeetingRoomHat } from "../type/MeetingRoomHat";

interface IProps {
  hats: IMeetingRoomHat[];
  handleOpenMoal: () => void;
  chatPhaseId3: string;
}

export default function MeetingContents({
  hats,
  handleOpenMoal,
  chatPhaseId3
}: IProps) {
  const [showBlur, setShowBlur] = useState(true);
  const bottomOfPanelRef = useRef<HTMLDivElement>(null);

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
              img={hats[0].img}
              thought={hats[0].thought}
              name={hats[0].name}
              characteristic={hats[0].characteristic}
            />
          </li>
          {hats[0].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[1].message}
                img={hats[1].img}
                thought={hats[1].thought}
                name={hats[1].name}
                characteristic={hats[1].characteristic}
              />
            </li>
          )}
          {hats[1].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[2].message}
                img={hats[2].img}
                thought={hats[2].thought}
                name={hats[2].name}
                characteristic={hats[2].characteristic}
              />
            </li>
          )}
          {hats[2].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[3].message}
                img={hats[3].img}
                thought={hats[3].thought}
                name={hats[3].name}
                characteristic={hats[3].characteristic}
              />
            </li>
          )}
          {hats[3].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[4].message}
                img={hats[4].img}
                thought={hats[4].thought}
                name={hats[4].name}
                characteristic={hats[4].characteristic}
              />
            </li>
          )}
          {hats[4].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[5].message}
                img={hats[5].img}
                thought={hats[5].thought}
                name={hats[5].name}
                characteristic={hats[5].characteristic}
              />
            </li>
          )}
          {hats[5].isFinish && (
            <li className='max-w-[688px]'>
              <AiComment
                messages={hats[6].message}
                img={hats[6].img}
                thought={hats[6].thought}
                name={hats[6].name}
                characteristic={hats[6].characteristic}
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
          {chatPhaseId3 === "undefined" && hats[6].isFinish && (
            <Button onClick={handleOpenMoal} classNames='w-[380px]'>
              추가 회의하기
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
