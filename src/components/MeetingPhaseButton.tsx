import React from "react";

interface IProps {
  children: React.ReactNode;
  isOn?: boolean;
}

export default function MeetingPhaseButton({ children, isOn = false }: IProps) {
  return (
    <button
      className={`px-[20px] py-[12px] rounded-sm border ${
        isOn
          ? "bg-[#dffc1c33] border-[#DFFC1C]"
          : "bg-[#ffffff1a] border-[#ffffff33] text-[#ffffff66]"
      }`}
    >
      {children}차 회의
    </button>
  );
}
