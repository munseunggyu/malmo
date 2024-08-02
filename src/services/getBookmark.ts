import { constants } from "@/utils";

export const getBookmark = async (userId: string) => {
  const response = await fetch(constants.apiUrl + "chat/bookmark", {
    method: "GET",
    headers: {
      "user-id": userId
    }
  });
  const data = await response.json();

  return data.bookMarks;
};
