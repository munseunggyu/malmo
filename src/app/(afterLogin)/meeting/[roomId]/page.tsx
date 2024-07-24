"use client";
import React, { useEffect, useState } from "react";
import { constants } from "@/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import MeetingHeader from "./_component/MeetingHeader";
import MeetingContents from "./_component/MeetingContents";
import MeetingResult from "./_component/MeetingResult";

interface IProps {
  params: { roomId: string };
}

export default function MeetingPage({ params }: IProps) {
  const { data } = useSession();
  const user = data?.user;

  const searchParams = useSearchParams();
  const chatPhaseId = searchParams.get("chatPhaseId") || "";

  const fetchAiStream = async ({
    userId,
    chatPhaseId
  }: {
    userId: string | undefined;
    chatPhaseId: string;
  }) => {
    if (!userId) return;
    const response = await fetch(constants.apiUrl + "chat/stream", {
      method: "POST",
      headers: {
        accept: "text/event-stream",
        "user-id": userId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatPhaseId: Number(chatPhaseId),
        role: "BLUE_HAT",
        gptType: "HYPER_CLOVA"
      })
    });
  };
  return (
    <div className='h-full'>
      <MeetingHeader />
      <section
        className='flex'
        style={{
          height: "calc(100% - 130px)"
        }}
      >
        <MeetingContents />
        <MeetingResult />
      </section>
    </div>
  );
}
