"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AiComment from "./AiComment";
import Button from "@/components/ui/Button";

export default function MeetingContents() {
  const [showBlur, setShowBlur] = useState(true);

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
            <AiComment />
          </li>

          <li className='max-w-[688px]'>
            <AiComment />
          </li>
          <li className='max-w-[688px]'>
            <AiComment />
          </li>
          <li className='max-w-[688px]'>
            <AiComment />
          </li>
          <li className='max-w-[688px]'>
            <AiComment />
          </li>
          <li className='max-w-[688px]'>
            <AiComment />
          </li>

          <li ref={ref} className='text-bg-1'>
            -
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
        <div className='absolute bottom-10'>
          <Button classNames='w-[380px]'>추가 회의하기</Button>
        </div>
      </section>
    </section>
  );
}
