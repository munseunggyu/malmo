import { constants } from "@/utils";
import { getHistory } from "./getHistory";

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
    // 추후 삭제 - 테스트 기간 회의 수 제한
    const historyList = await getHistory(userId);
    if (historyList.length > 3 && category) {
      alert(
        "테스트 기간 동안 사용자에게 할당된 회의 수가 끝났습니다.\n이용해 주셔서 감사합니다."
      );
      return;
    }
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
