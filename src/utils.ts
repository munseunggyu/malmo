import blueHatImg from "../public/hats/blue-hat.png";
import yelloHatImg from "../public/hats/yellow-hat.png";
import greenHatImg from "../public/hats/green-hat.png";
import blackHatImg from "../public/hats/black-hat.png";
import redHatImg from "../public/hats/red-hat.png";
import whiteHatImg from "../public/hats/white-hat.png";

import { IHat } from "./types/Hat";

interface IConstants {
  apiUrl: string;
  BLUE_HAT: IHat;
  RED_HAT: IHat;
  WHITE_HAT: IHat;
  BLACK_HAT: IHat;
  YELLOW_HAT: IHat;
  GREEN_HAT: IHat;
  BLUE_HAT_BEGIN: IHat;
  SUMMARY: IHat;
}

export const constants: IConstants = {
  apiUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9090/",
  BLUE_HAT_BEGIN: "BLUE_HAT_BEGIN",
  BLUE_HAT: "BLUE_HAT",
  RED_HAT: "RED_HAT",
  WHITE_HAT: "WHITE_HAT",
  BLACK_HAT: "BLACK_HAT",
  YELLOW_HAT: "YELLOW_HAT",
  GREEN_HAT: "GREEN_HAT",
  SUMMARY: "SUMMARY"
};

export const allHats = [
  constants.BLUE_HAT_BEGIN,
  constants.WHITE_HAT,
  constants.GREEN_HAT,
  constants.YELLOW_HAT,
  constants.BLACK_HAT,
  constants.RED_HAT,
  constants.BLUE_HAT
];

export const roleInfo = (role: IHat) => {
  if (role === constants.BLUE_HAT_BEGIN) {
    return {
      img: blueHatImg,
      thought: "통솔적 사고",
      name: "파랑이",
      characteristic: "모자들을 통솔하고 전체 의견을 요약 제시",
      isStop: false
    };
  } else if (role === constants.WHITE_HAT) {
    return {
      img: whiteHatImg,
      thought: "객관적 사고",
      name: "하양이",
      characteristic: "정보를 바탕으로 한 객관적 상황 제시",
      isStop: false
    };
  } else if (role === constants.GREEN_HAT) {
    return {
      img: greenHatImg,
      thought: "창조적 사고",
      name: "초록이",
      characteristic: "아이디어의 새로운 측면을 볼 수 있는 추가 대안 제시",
      isStop: false
    };
  } else if (role === constants.YELLOW_HAT) {
    return {
      img: yelloHatImg,
      thought: "긍정적 사고",
      name: "노랑이",
      characteristic: "아이디어의 장점 및 성공요인 제시",
      isStop: false
    };
  } else if (role === constants.BLACK_HAT) {
    return {
      img: blackHatImg,
      thought: "비판적 사고",
      name: "까망이",
      characteristic: "잠재적 위험을 파악할 수 있는 실패 요인 제시",
      isStop: false
    };
  } else if (role === constants.RED_HAT) {
    return {
      img: redHatImg,
      thought: "감성적 사고",
      name: "빨강이",
      characteristic: "직관적 반응을 파악할 수 있는 감성적 평가 제시",
      isStop: false
    };
  } else {
    return {
      img: blueHatImg,
      thought: "통솔적 사고",
      name: "파랑이",
      characteristic: "모자들을 통솔하고 전체 의견을 요약 제시",
      isStop: false
    };
  }
};

export const hatsOrder = [...allHats, constants.SUMMARY];
