import React from "react";
import GuideBtn from "./GuideBtn";

import icoVideo from "../../../public/ico-youtube.svg";
import icoTjfrmt from "../../../public/ico-tjfrmt.svg";
import icoBusiness from "../../../public/ico-business.svg";
import { StaticImageData } from "next/image";
export default function GuideGrid() {
  const guideDataList = [
    {
      img: icoBusiness as StaticImageData,
      alt: "사업",
      title: "사업",
      contents:
        "Ai캐릭터 앱 사업 할거야. 북미의 애니 팬들을 타겟\n으로 , 캐릭터와 스토리 생성을 해주는 서비스야. "
    },
    {
      img: icoTjfrmt as StaticImageData,
      alt: "사이드 프로젝트",
      title: "사이드 프로젝트",
      contents:
        "사이드프로젝트로 코딩 능률을 높여주는 음악을 모\n아둔 웹사이트를 개발하는 건 어때?"
    },
    {
      img: icoBusiness as StaticImageData,
      alt: "사업",
      title: "사업",
      contents:
        "요즘 두바이 초콜릿이 유행이니까,두바이 초콜릿과\n크루아상을 결합해서 사업을 하는 건 어떨까?"
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
