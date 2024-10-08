import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  summaryRoomName: string;
}

function MeetingHeader({ summaryRoomName }: IProps) {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const phase = searchParams.get("phase");
  const chatPhaseId2 = searchParams.get("chatPhaseId2");
  const chatPhaseId3 = searchParams.get("chatPhaseId3");

  return (
    <section className='flex items-center gap-[40px] px-[60px] py-[18.5px]'>
      <h2 className='title3 truncate max-w-[500px]'>{summaryRoomName}</h2>
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

export default React.memo(MeetingHeader);
