import { IHat } from "./Hat";

export interface IStreamHat {
  role: IHat;
  message: string;
  isFinish: boolean;
}
