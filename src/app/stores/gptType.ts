import { create } from "zustand";

interface IUseGptType {
  gptType: string;
  changeGptType: (gptType: string) => void;
}

export const useGptType = create<IUseGptType>(set => ({
  gptType: localStorage.getItem("gptType") || "HYPER_CLOVA",
  changeGptType(type: string) {
    set(() => {
      localStorage.setItem("gptType", type);
      return {
        gptType: type
      };
    });
  }
}));
