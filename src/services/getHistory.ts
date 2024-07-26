import { constants } from "@/utils";

export const getHistory = async (userId: string) => {
  const response = await fetch(constants.apiUrl + "chat/rooms", {
    method: "GET",
    headers: {
      "user-id": userId
    },
    cache: "no-store"
  });
  const data = await response.json();
  return data;
};
