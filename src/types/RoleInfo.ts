import { StaticImageData } from "next/image";

export interface IRoleInfo {
  img: StaticImageData;
  thought: string;
  name: string;
  characteristic: string;
  isStop: boolean;
}
