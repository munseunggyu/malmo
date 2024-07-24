import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import React from "react";

export default function MeetingHeader() {
  return (
    <section className='flex items-center gap-[40px] px-[68px] py-[40px]'>
      <h2 className='font-[700] text-[24px]'>아이디어 토픽 요약 내용</h2>
      <ul>
        <li>
          <MeetingPhaseButton isOn={true}>1</MeetingPhaseButton>
        </li>
      </ul>
    </section>
  );
}
