import { constants } from "@/utils";

export const fetchAiStream = async ({
  userId,
  chatPhaseId,
  role = "BLUE_HAT",
  gptType = "HYPER_CLOVA"
}: {
  userId: string | undefined;
  chatPhaseId: string;
  role: string;
  gptType?: string;
}) => {
  if (!userId) return;
  const response = await fetch(constants.apiUrl + "chat/stream", {
    method: "POST",
    headers: {
      accept: "text/event-stream",
      "user-id": userId,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatPhaseId: Number(chatPhaseId),
      role,
      gptType
    })
  });
  // 응답을 스트림으로 처리
  if (!response.body) return;
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";
  let result = {
    red: ""
  };
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });

    // 줄 단위로 데이터 처리
    let lines = buffer.split("\n");
    buffer = lines.pop() || ""; // 마지막 줄이 완전한 데이터가 아닐 수 있으므로 buffer에 저장

    for (let line of lines) {
      if (line.startsWith("data:")) {
        let jsonText = line.substring(5).trim(); // 'data:' 부분을 제거하고 공백을 제거
        try {
          const json = JSON.parse(jsonText);
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
      }
    }
  }
};
