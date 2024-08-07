import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DelButton from "@/components/ui/DelButton";
import { useHistoryMutation } from "@/queries.ts/history";
import Link from "next/link";

export default function HistoryItem({ ...history }) {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  const [showDelBtn, setShowDelBtn] = useState(false);

  const delHistory = useHistoryMutation({
    userId: user?.id!,
    historyId: history.id,
    queryClient
  });

  const handleDel = () => {
    delHistory.mutate();
  };

  return (
    <>
      <Link
        href={`/meeting/${history.id}?phase=${1}&isDirect=true`}
        className='w-full'
      >
        <p className='max-w-[830px] w-full truncate'>
          {history.roomName || "-"}
        </p>
      </Link>
      <ol className='min-w-[305px] flex gap-x-xs ml-auto justify-end'>
        {Array.from({ length: history.phase }).map((_, index) => (
          <li key={index}>
            <MeetingPhaseButton
              phase={String(index + 1)}
              isOn={true}
              roomId={history.id}
            >
              {index + 1}
            </MeetingPhaseButton>
          </li>
        ))}
      </ol>
      <div className='relative ml-auto flex items-center'>
        <button
          className={`w-[44px] h-[44px]  bg-[url('/ico-control.svg')] hover:bg-[url('/ico-control-hover.svg')] ${
            showDelBtn
              ? "bg-[url('/ico-control-hover.svg')]"
              : "bg-[url('/ico-control.svg')]"
          }`}
          onClick={() => setShowDelBtn(prev => !prev)}
        />
        {showDelBtn && <DelButton left={-82} handleClick={handleDel} />}
      </div>
    </>
  );
}
