import { constants, roleInfo } from "@/utils";

export const getMeeting = async ({
  userId,
  roomId
}: {
  userId: string | undefined;
  roomId: number;
}) => {
  if (!userId) return;
  const response = await fetch(constants.apiUrl + `chat/messages/${roomId}`, {
    method: "GET",
    headers: {
      "user-id": userId
    }
  });

  const data = await response.json();

  return data.rooms;
};
