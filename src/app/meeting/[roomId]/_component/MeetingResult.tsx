import React from "react";

export default function MeetingResult({ message }: { message: string }) {
  return (
    <section
      className=''
      style={{
        flex: 185,
        height: "calc(100% - 100px)"
      }}
    >
      <h3 className='border border-divider-1 border-x-0 px-[68px] py-[24px] subtitle1'>
        회의 결과
      </h3>
      <section className='px-[40px] py-[20px] h-full'>
        <p className='bg-bg-3 h-full rounded-md border border-main px-[40px] py-[20px] whitespace-pre-wrap break-keep overflow-scroll'>
          {message}
        </p>
      </section>
    </section>
  );
}
