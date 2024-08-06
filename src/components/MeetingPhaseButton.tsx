"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  children: React.ReactNode;
  isOn?: boolean;
  query?: {
    [k: string]: string;
  };
  phase: string;
  isMeetingRoom?: boolean;
  roomId?: string;
}

export default function MeetingPhaseButton({
  children,
  isOn = false,
  query,
  phase,
  isMeetingRoom = false,
  roomId
}: IProps) {
  const pathname = usePathname();
  const newQuery = { ...query, phase };
  const newQueryString = new URLSearchParams(newQuery).toString();
  let newUrl = "";
  if (isMeetingRoom) {
    newUrl = `${pathname}?${newQueryString}`;
  } else {
    newUrl = `/meeting/${roomId}?phase=${phase}&isDirect=true `;
  }
  return (
    <Link
      href={newUrl}
      className={`px-[16px] py-[8px] rounded-sm border font-[500] ${
        isOn
          ? "bg-[#dffc1c33] border-[#DFFC1C]"
          : "bg-[#ffffff1a] border-[#ffffff33] text-[#ffffff66]"
      }`}
    >
      {children}차 회의
    </Link>
  );
}
