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
}

export default function MeetingPhaseButton({
  children,
  isOn = false,
  query,
  phase
}: IProps) {
  const pathname = usePathname();
  const newQuery = { ...query, phase };
  const newQueryString = new URLSearchParams(newQuery).toString();
  const newUrl = `${pathname}?${newQueryString}`;
  return (
    <Link
      href={newUrl}
      className={`px-[20px] py-[12px] rounded-sm border ${
        isOn
          ? "bg-[#dffc1c33] border-[#DFFC1C]"
          : "bg-[#ffffff1a] border-[#ffffff33] text-[#ffffff66]"
      }`}
    >
      {children}차 회의
    </Link>
  );
}
