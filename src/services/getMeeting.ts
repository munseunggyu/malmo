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
  console.log(data);
  // let result = { "1": {}, "2": {}, "3": {} };
  // for (let i = 0; i < data.rooms.length; i++) {
  //   const idx = String(i + 1) as "1" | "2" | "3";
  //   result[idx] = {
  //     ...data.rooms[i],
  //     aiMessages: data.rooms[i].aiMessages.map((hat: IAllMessages) => ({
  //       ...hat,
  //       isFinish: true,
  //       ...roleInfo(hat.role)
  //     }))
  //   };
  // }
  // console.log("wow", result);

  return data.rooms;
};
