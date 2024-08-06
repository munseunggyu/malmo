import React from "react";

import workingImg from "../../../../../public/workong-img.png";
import Image from "next/image";
import AiMessageLoading from "@/components/ui/AiMessageLoading";
import MarkdownViewer from "@/components/ui/MarkdownViewer";

export default function MeetingResult({
  message,
  isLoading
}: {
  message: string;
  isLoading: boolean;
}) {
  return (
    <section
      className=''
      style={{
        flex: 185,
        height: "calc(100% - 100px)"
      }}
    >
      <h3 className='border border-divider-1 border-x-0 px-[68px] py-[16px] title3'>
        회의 결과
      </h3>
      <section className='px-[40px] py-[20px] h-full'>
        {message?.length > 0 ? (
          <div className='bg-bg-3 h-full rounded-md border border-main px-[40px] py-[20px] overflow-scroll'>
            <MarkdownViewer content={message} />
          </div>
        ) : (
          <div className='flex items-center flex-col w-full'>
            {!isLoading ? (
              <Image
                src={workingImg}
                width={320}
                height={262}
                alt='회의 결과 요약중...'
              />
            ) : (
              <AiMessageLoading size={225} className='mb-md mt-sm' />
            )}
            <p className='subtitle1 text-center text-[#ffffff66] relative top-[-30px'>
              회의가 끝나면
              <br />
              결과를 한 눈에 요약해 드려요!
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
