import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function MeetingHeader() {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const phase = searchParams.get("phase");
  const chatPhaseId2 = searchParams.get("chatPhaseId2");
  const chatPhaseId3 = searchParams.get("chatPhaseId3");

  return (
    <section className='flex items-center gap-[40px] px-[68px] py-[40px]'>
      <h2 className='font-[700] text-[24px]'>아이디어 토픽 요약 내용</h2>
      <ul className='flex gap-xs'>
        <li>
          <MeetingPhaseButton
            phase={"1"}
            query={query}
            isMeetingRoom={true}
            isOn={phase === "1"}
          >
            1
          </MeetingPhaseButton>
        </li>
        {chatPhaseId2 && chatPhaseId2 !== "undefined" && (
          <li>
            <MeetingPhaseButton
              phase={"2"}
              query={query}
              isMeetingRoom={true}
              isOn={phase === "2"}
            >
              2
            </MeetingPhaseButton>
          </li>
        )}
        {chatPhaseId3 && chatPhaseId3 !== "undefined" && (
          <li>
            <MeetingPhaseButton
              phase={"3"}
              query={query}
              isMeetingRoom={true}
              isOn={phase === "3"}
            >
              3
            </MeetingPhaseButton>
          </li>
        )}
      </ul>
    </section>
  );
}
