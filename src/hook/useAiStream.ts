import { getHistory } from "@/services/getHistory";
import { getMeeting } from "@/services/getMeeting";
import { IAiMessages } from "@/types/MeetingMessageData";
import { constants, roleInfo } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface IAiStream {
  userId: string | undefined;
  gptType?: string;
  roomId: string;
  isNew: string;
  phase: "1";
}

export const useAiStream = ({
  userId,
  gptType = "HYPER_CLOVA",
  roomId,
  isNew,
  phase
}: IAiStream) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatPhaseId1 = searchParams.get("chatPhaseId1") || "";
  const isDirect = searchParams.get("isDirect") || "";
  const [isRefresh, setIsRefresh] = useState(true);

  const [summaryRoomName, setSummaryRoomName] = useState("");
  const [sseMeetingData, setSseMeetingData] = useState({
    "1": {
      chatPhaseId: chatPhaseId1,
      phase: 1,
      roomId,
      aiMessages: [
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT_BEGIN,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT_BEGIN)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.WHITE_HAT,
          isFinish: false,
          ...roleInfo(constants.WHITE_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.GREEN_HAT,
          isFinish: false,
          ...roleInfo(constants.GREEN_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.YELLOW_HAT,
          isFinish: false,
          ...roleInfo(constants.YELLOW_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLACK_HAT,
          isFinish: false,
          ...roleInfo(constants.BLACK_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.RED_HAT,
          isFinish: false,
          ...roleInfo(constants.RED_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT)
        }
      ],
      summary: {
        message: ""
      }
    },
    "2": {
      chatPhaseId: "undefined",
      phase: 2,
      roomId,
      aiMessages: [
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT_BEGIN,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT_BEGIN)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.WHITE_HAT,
          isFinish: false,
          ...roleInfo(constants.WHITE_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.GREEN_HAT,
          isFinish: false,
          ...roleInfo(constants.GREEN_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.YELLOW_HAT,
          isFinish: false,
          ...roleInfo(constants.YELLOW_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLACK_HAT,
          isFinish: false,
          ...roleInfo(constants.BLACK_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.RED_HAT,
          isFinish: false,
          ...roleInfo(constants.RED_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT)
        }
      ],
      summary: {
        message: ""
      }
    },
    "3": {
      chatPhaseId: "undefined",
      phase: 3,
      roomId,
      aiMessages: [
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT_BEGIN,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT_BEGIN)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.WHITE_HAT,
          isFinish: false,
          ...roleInfo(constants.WHITE_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.GREEN_HAT,
          isFinish: false,
          ...roleInfo(constants.GREEN_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.YELLOW_HAT,
          isFinish: false,
          ...roleInfo(constants.YELLOW_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLACK_HAT,
          isFinish: false,
          ...roleInfo(constants.BLACK_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.RED_HAT,
          isFinish: false,
          ...roleInfo(constants.RED_HAT)
        },
        {
          bookmarked: false,
          chatRoomId: roomId,
          message: "",
          role: constants.BLUE_HAT,
          isFinish: false,
          ...roleInfo(constants.BLUE_HAT)
        }
      ],
      summary: {
        message: ""
      }
    }
  });

  const fetchAiStream = async ({
    role = "BLUE_HAT",
    chatPhaseId,
    roleType
  }: {
    role: string;
    chatPhaseId: string;
    roleType: "hats" | "title" | "summary";
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
        chatPhaseId: chatPhaseId,
        role,
        gptType
      })
    });
    // 응답을 스트림으로 처리
    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let hatRole = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        if (roleType === "hats") {
          setSseMeetingData(prev => {
            return {
              ...prev,
              [phase]: {
                ...prev[phase],
                aiMessages: prev[phase].aiMessages.map(message => {
                  if (message.role === hatRole) {
                    return {
                      ...message,
                      isFinish: true
                    };
                  }

                  return {
                    ...message
                  };
                })
              }
            };
          });
        }
        return true;
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
            hatRole = json.role;
            if (roleType === "title") {
              setSummaryRoomName(json.message);
            }
            if (roleType === "hats") {
              setSseMeetingData(prev => {
                return {
                  ...prev,
                  [phase]: {
                    ...prev[phase],
                    aiMessages: prev[phase].aiMessages.map(hat => {
                      if (hat.role === hatRole) {
                        return {
                          ...hat,
                          message: hat.message + json.message,
                          aiMessageId: json.aiMessageId
                        };
                      }
                      return {
                        ...hat
                      };
                    })
                  }
                };
              });
            }
            if (roleType === "summary") {
              setSseMeetingData(prev => {
                return {
                  ...prev,
                  [phase]: {
                    ...prev[phase],
                    summary: {
                      message: json.message
                    }
                  }
                };
              });
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }
    }
  };

  const startAi = async (chatPhaseId: string) => {
    if (phase === "1") {
      fetchAiStream({
        role: "SUMMARY_ROOM_NAME",
        chatPhaseId,
        roleType: "title"
      });
    }
    for (let i = 0; i < sseMeetingData[phase].aiMessages.length; i++) {
      const res = await fetchAiStream({
        role: sseMeetingData[phase].aiMessages[i].role,
        chatPhaseId,
        roleType: "hats"
      });
    }
    fetchAiStream({
      role: "SUMMARY",
      chatPhaseId,
      roleType: "summary"
    });
  };

  const handleGetMeeting = async () => {
    const res = await getMeeting({ userId: userId, roomId: Number(roomId) });

    let url = "";
    if (userId) {
      const historyList = await getHistory(userId);
      const findRoom = historyList.find((history: { id: number }) => {
        return String(history.id) === roomId;
      });
      setSummaryRoomName(findRoom.roomName);
    }
    if (res) {
      if (isDirect === "true") {
        const nowPhase = phase;
        let chatPhaseId1;
        let chatPhaseId2;
        let chatPhaseId3;
        res.forEach((item: { chatPhaseId: number; phase: number }) => {
          if (item.phase === 1) {
            chatPhaseId1 = item.chatPhaseId;
          }
          if (item.phase === 2) {
            chatPhaseId2 = item.chatPhaseId;
          }
          if (item.phase === 3) {
            chatPhaseId3 = item.chatPhaseId;
          }
        });

        url = `/meeting/${roomId}?chatPhaseId1=${chatPhaseId1}&chatPhaseId2=${chatPhaseId2}&chatPhaseId3=${chatPhaseId3}&phase=${nowPhase}&isNew=false`;
        router.replace(url);
      }
      res.sort((a: { phase: number }, b: { phase: number }) => {
        return a.phase - b.phase;
      });
      if (res[0]) {
        setSseMeetingData(prev => {
          return {
            ...prev,
            ["1"]: {
              ...prev["1"],
              ...res[0],
              summary: {
                ...res[0].aiMessages.find(
                  (ai: IAiMessages) => ai.role === "SUMMARY"
                )
              },
              aiMessages: res[0].aiMessages
                .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
                .map((message: IAiMessages) => {
                  return {
                    ...roleInfo(message.role),
                    ...message,
                    isFinish: true,
                    aiMessageId: message.id
                  };
                })
            }
          };
        });
      }
      if (res[1]) {
        setSseMeetingData(prev => {
          return {
            ...prev,
            ["2"]: {
              ...prev["2"],
              ...res[0],
              summary: {
                ...res[1].aiMessages.find(
                  (ai: IAiMessages) => ai.role === "SUMMARY"
                )
              },
              aiMessages: res[1].aiMessages
                .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
                .map((message: IAiMessages) => {
                  return {
                    ...roleInfo(message.role),
                    ...message,
                    isFinish: true,
                    aiMessageId: message.id
                  };
                })
            }
          };
        });
      }
      if (res[2]) {
        setSseMeetingData(prev => {
          return {
            ...prev,
            ["3"]: {
              ...prev["3"],
              ...res[0],
              summary: {
                ...res[2].aiMessages.find(
                  (ai: IAiMessages) => ai.role === "SUMMARY"
                )
              },
              aiMessages: res[2].aiMessages
                .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
                .map((message: IAiMessages) => {
                  return {
                    ...roleInfo(message.role),
                    ...message,
                    isFinish: true,
                    aiMessageId: message.id
                  };
                })
            }
          };
        });
      }
    }
  };

  const handleBookmark = async (aiMessageId: string) => {
    if (!userId) return;
    const response = await fetch(
      constants.apiUrl + `chat/bookmark/${aiMessageId}`,
      {
        method: "PUT",
        headers: {
          "user-id": userId
        }
      }
    );
    const data = await response.json();
    setSseMeetingData(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        aiMessages: prev[phase].aiMessages.map((message: IAiMessages) => {
          if (message.aiMessageId === aiMessageId) {
            return {
              ...message,
              bookmarked: data.bookmarked
            };
          }
          return {
            ...message
          };
        })
      }
    }));
  };

  useEffect(() => {
    if (isNew === "false" && isRefresh) {
      handleGetMeeting();
    }
    if (isDirect === "true") {
      handleGetMeeting();
      setIsRefresh(false);
    }
    if (isNew !== "true") return;
    setIsRefresh(false);
    const chatPhaseId2 = searchParams.get("chatPhaseId2") || "";
    const chatPhaseId3 = searchParams.get("chatPhaseId3") || "";
    router.replace(
      `/meeting/${roomId}/?chatPhaseId1=${chatPhaseId1}&chatPhaseId2=${chatPhaseId2}&chatPhaseId3=${chatPhaseId3}&phase=${phase}&isNew=false`
    );
    let chatPhaseId = "";
    if (phase === "1") {
      chatPhaseId = chatPhaseId1;
      setSseMeetingData(prev => ({
        ...prev,
        "1": {
          ...prev["1"],
          chatPhaseId: chatPhaseId1
        }
      }));
    } else if (phase === "2") {
      chatPhaseId = chatPhaseId2;
      setSseMeetingData(prev => ({
        ...prev,
        "2": {
          ...prev["2"],
          chatPhaseId: chatPhaseId2
        }
      }));
    } else {
      chatPhaseId = chatPhaseId3;
      setSseMeetingData(prev => ({
        ...prev,
        "3": {
          ...prev["3"],
          chatPhaseId: chatPhaseId3
        }
      }));
    }
    startAi(chatPhaseId);
  }, [isNew, userId]);

  return {
    sseMeetingData,
    setSseMeetingData,
    handleBookmark,
    summaryRoomName
  };
};
