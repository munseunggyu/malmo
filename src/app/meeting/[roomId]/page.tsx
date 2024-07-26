"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import MeetingHeader from "./_component/MeetingHeader";
import MeetingContents from "./_component/MeetingContents";
import MeetingResult from "./_component/MeetingResult";
import { useAiStream } from "@/hook/useAiStream";

import ModalPortal from "@/components/ui/ModalPortal";
import ModalContainer from "@/components/ui/ModalContainer";
import ChatModal from "@/components/ChatModal";
import { useModal } from "@/hook/useModal";

interface IProps {
  params: { roomId: string };
}

export default function MeetingPage({ params }: IProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const searchParams = useSearchParams();
  const phase = ((searchParams.get("phase") || "1") as "1") || "2" || "3";
  const isNew = searchParams.get("isNew") || "";

  const { sseMeetingData, setSseMeetingData } = useAiStream({
    userId: user?.id,
    roomId: params.roomId,
    isNew,
    phase
  });

  return (
    <div className='h-full'>
      <MeetingHeader />
      <section
        className='flex'
        style={{
          height: "calc(100% - 130px)"
        }}
      >
        <MeetingContents
          hats={sseMeetingData[phase].aiMessages}
          handleOpenMoal={handleOpenMoal}
          chatPhaseId3={sseMeetingData["3"].chatPhaseId}
        />
        <MeetingResult />
      </section>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal
              phase={phase}
              roomId={params.roomId}
              handleCloseModal={handleCloseModal}
            />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
