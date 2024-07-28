import { IHat } from "@/types/Hat";
import { IRoleInfo } from "@/types/RoleInfo";
import { allHats, roleInfo } from "@/utils";
import { StaticImageData } from "next/image";

class AIMessages implements IRoleInfo {
  bookmarked: boolean;
  chatRoomId: string;
  message: string;
  role: IHat;
  isFinish: boolean;
  img: StaticImageData;
  thought: string;
  name: string;
  characteristic: string;
  isStop: boolean;

  constructor(chatRoomId: string, role: IHat) {
    this.bookmarked = false;
    this.chatRoomId = chatRoomId;
    this.message = "";
    this.role = role;
    this.isFinish = false;
    const roleInfoData = roleInfo(role);
    this.img = roleInfoData.img;
    this.thought = roleInfoData.thought;
    this.name = roleInfoData.name;
    this.characteristic = roleInfoData.characteristic;
    this.isStop = roleInfoData.isStop;
  }
}

class Summary {
  message: string;
  isLoading: boolean;

  constructor() {
    this.message = "";
    this.isLoading = false;
  }
}

class MeetingData {
  chatPhaseId: string;
  phase: number;
  roomId: string;
  aiMessages: AIMessages[];
  summary: Summary;

  constructor(
    chatPhaseId: string,
    phase: number,
    roomId: string,
    roles: IHat[]
  ) {
    this.chatPhaseId = chatPhaseId;
    this.phase = phase;
    this.roomId = roomId;
    this.aiMessages = roles.map(role => new AIMessages(roomId, role));
    this.summary = new Summary();
  }
}

export class MeetingDataFactory {
  static createChatPhase(
    chatPhaseId: string,
    phase: number,
    roomId: string
  ): MeetingData {
    const roles: IHat[] = [...allHats];
    return new MeetingData(chatPhaseId, phase, roomId, roles);
  }
}
