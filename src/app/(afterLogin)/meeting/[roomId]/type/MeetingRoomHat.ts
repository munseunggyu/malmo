import { IStreamHat } from "@/types/StreamHat";
import { StaticImageData } from "next/image";

export interface IHatInfo {
  img: StaticImageData;
  thought: string;
  name: string;
  characteristic: string;
}

export interface IMeetingRoomHat extends IStreamHat, IHatInfo {}
