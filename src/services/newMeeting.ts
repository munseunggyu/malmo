import { constants } from "@/utils";

export const fetchNewMeeting = async ({
  category,
  message,
  userId,
  roomId = null
}: {
  category?: string;
  message: string;
  userId: string;
  roomId?: number | null;
}) => {
  try {
    const response = await fetch(constants.apiUrl + "chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId
      },
      body: JSON.stringify({
        category,
        message,
        roomId
      })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
