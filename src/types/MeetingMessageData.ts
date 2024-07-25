import { StaticImageData } from "next/image";
import { IHat } from "./Hat";

export interface IAiMessages {
  bookmarked: boolean;
  chatRoomId: string;
  message: string;
  role: IHat;
  isFinish: boolean;
  img: StaticImageData;
  thought: string;
  name: string;
  characteristic: string;
}

export interface IMeetingMessageData {
  chatPhaseId: string;
  phase: "1";
  roomId: string;
  aiMessages: IAiMessages[];
}
