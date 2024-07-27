import { create } from "zustand";

interface IUseGptType {
  gptType: {
    value: string;
    name: string;
  };
  changeGptType: (gptType: string) => void;
}

export const useGptType = create<IUseGptType>(set => {
  const gptTypeValue =
    typeof window !== "undefined"
      ? window.localStorage.getItem("gptType") || "HYPER_CLOVA"
      : "HYPER_CLOVA";
  return {
    gptType: {
      value: gptTypeValue,
      name: gptTypeValue === "HYPER_CLOVA" ? "HyperCLOVA X" : "GPT-4o mini"
    },
    changeGptType(type: string) {
      set(() => {
        localStorage.setItem("gptType", type);
        return {
          gptType: {
            value: type,
            name: type === "HYPER_CLOVA" ? "HyperCLOVA X" : "GPT-4o mini"
          }
        };
      });
    }
  };
});
