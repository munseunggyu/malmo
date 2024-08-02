import MeetingPhaseButton from "@/components/MeetingPhaseButton";
import { constants } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IHistory } from "./HistoryList";
import Image from "next/image";
import icoDel from "../../../../public/ico-delete.svg";
import DelButton from "@/components/ui/DelButton";

export default function HistoryItem({ ...history }) {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  const [showDelBtn, setShowDelBtn] = useState(false);

  const delHistory = useMutation({
    mutationFn: () => {
      return fetch(constants.apiUrl + `chat/rooms/${history.id}`, {
        method: "DELETE",
        headers: {
          "user-id": user?.id || ""
        }
      });
    },
    onSuccess() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach(queryKey => {
        if (queryKey[0] === "history") {
          const historyList = queryClient.getQueryData<IHistory[]>(["history"]);
          const data = historyList?.filter(item => item.id !== history.id);

          queryClient.setQueryData(["history"], data);
        }
      });
    }
  });

  const handleDel = () => {
    delHistory.mutate();
  };

  return (
    <>
      <p className='max-w-[830px] w-full truncate'>{history.roomName || "-"}</p>
      <ol className='min-w-[305px] flex gap-x-xs ml-auto'>
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
