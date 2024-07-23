import React from "react";
import GuideBtn from "./GuideBtn";

import icoVideo from "../../../../public/ico-youtube.svg";
import icoTjfrmt from "../../../../public/ico-tjfrmt.svg";
import icoBusiness from "../../../../public/ico-business.svg";
import { StaticImageData } from "next/image";
export default function GuideGrid() {
  const guideDataList = [
    {
      img: icoVideo as StaticImageData,
      alt: "유튜브 아이콘",
      title: "유튜브",
      contents:
        "반려동물의 노화 관리: 노령 반려동물을 위한\n특별한 케어 방법에 대한 주제는 어때?"
    },
    {
      img: icoTjfrmt as StaticImageData,
      alt: "블로그 아이콘",
      title: "블로그",
      contents:
        "AI 기반 특화 데이터 보안 서비스로 기업의\n데이터 관리를 자동화하는 아이디어는 어때??"
    },
    {
      img: icoBusiness as StaticImageData,
      alt: "사업 아이템 아이콘",
      title: "사업 아이템",
      contents:
        "세계 각국의 전통 축제와 행사를 직접 체험하고\n 꿀팁을 주는 유튜브 컨셉은 어때?"
    }
  ];
  return (
    <div className='flex flex-col gap-y-[14px]'>
      {guideDataList.map((item, idx) => (
        <GuideBtn key={idx} {...item} />
      ))}
    </div>
  );
}
