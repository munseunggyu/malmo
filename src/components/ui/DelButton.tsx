import Image from "next/image";
import React from "react";
import icoDel from "../../../public/ico-delete.svg";

import styles from "./DelButton.module.css";

export default function DelButton({
  handleClick,
  left
}: {
  handleClick: () => void;
  left: number;
}) {
  return (
    <button
      className={`absolute w-[117px] top-[-55px] left-[${left}px] flex items-center gap-x-[10px] bg-[#222527] border border-[#4D4D4D] py-[12px] rounded-sm text-start px-[16px] text-error-2 text-[14px] ${styles.delBtn}`}
      onClick={handleClick}
      style={{
        boxShadow: "3px 1px 8px 0px rgba(0, 0, 0, 0.30)"
      }}
    >
      <Image src={icoDel} width={24} height={24} alt='로그아웃' /> 삭제하기
    </button>
  );
}
