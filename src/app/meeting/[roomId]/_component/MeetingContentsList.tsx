"use client";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import AiComment from "./AiComment";
import { useInView } from "react-intersection-observer";
import { IMeetingRoomHat } from "../type/MeetingRoomHat";

interface IProps {
  hats: IMeetingRoomHat[];
  handleBookmark: (id: string) => void;
  loadingBtn: boolean;
  roomId: string;
}

export function MeetingContentsList({
  hats,
  handleBookmark,
  roomId,
  loadingBtn
}: IProps) {
  const [showBlur, setShowBlur] = useState(true);
  const bottomOfPanelRef = useRef<HTMLDivElement>(null);

  const stopClick: MouseEventHandler<HTMLUListElement> = e => {
    if (loadingBtn) e.preventDefault();
    e.stopPropagation();
  };
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const renderAiComment = (hat: IMeetingRoomHat, idx: number) => {
    console.log(hat.aiMessageId);
    return (
      <li key={idx} className='max-w-[688px]'>
        <AiComment
          messages={hat.message}
          bookmarked={hat.bookmarked}
          aiMessageId={hat.aiMessageId}
          img={hat.img}
          thought={hat.thought}
          name={hat.name}
          characteristic={hat.characteristic}
          handleBookmark={handleBookmark}
          roomId={roomId}
        />
      </li>
    );
  };

  const renderHats = () => {
    const items = [];
    for (let i = 0; i < hats.length; i++) {
      items.push(renderAiComment(hats[i], i));
      if (!hats[i].isFinish) break;
    }
    return items;
  };

  useEffect(() => {
    if (inView) {
      setShowBlur(false);
    } else {
      setShowBlur(true);
    }
  }, [inView]);

  useEffect(() => {
    if (bottomOfPanelRef.current && loadingBtn) {
      bottomOfPanelRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [hats, loadingBtn]);
  return (
    <>
      <ul
        className='flex flex-col gap-y-[12px] h-[75%] overflow-scroll'
        onClick={stopClick}
      >
        {renderHats()}
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
    </>
  );
}
