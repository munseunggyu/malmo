import { useGptType } from "@/app/stores/gptType";
import { MeetingDataFactory } from "@/classes/sseMeetingDataFactory";
import { getHistory } from "@/services/getHistory";
import { getMeeting } from "@/services/getMeeting";
import { IHat } from "@/types/Hat";
import { IAiMessages } from "@/types/MeetingMessageData";
import { allHats, constants, hatsOrder, roleInfo } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface IAiStream {
  userId: string | undefined;
  roomId: string;
  isNew: string;
  phase: "1";
}

interface IisStopMeeting {
  "1": {
    isStop: boolean;
    lastRole: IHat | null;
  };
  "2": {
    isStop: boolean;
    lastRole: IHat | null;
  };
  "3": {
    isStop: boolean;
    lastRole: IHat | null;
  };
}

export const useAiStream = ({ userId, roomId, isNew, phase }: IAiStream) => {
  const queryClient = useQueryClient();
  const gptType = useGptType(state => state.gptType);
  const changeGptType = useGptType(state => state.changeGptType);
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatPhaseId1 = searchParams.get("chatPhaseId1") || "";
  const isDirect = searchParams.get("isDirect") || "";
  const [isRefresh, setIsRefresh] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [isStopMeeting, setIsStopMeeting] = useState<IisStopMeeting>({
    "1": {
      isStop: false,
      lastRole: null
    },
    "2": {
      isStop: false,
      lastRole: null
    },
    "3": {
      isStop: false,
      lastRole: null
    }
  });

  const nowIsStop = isStopMeeting[phase].isStop;
  const [summaryRoomName, setSummaryRoomName] = useState("");
  const [sseMeetingData, setSseMeetingData] = useState({
    "1": MeetingDataFactory.createChatPhase(chatPhaseId1, 1, roomId),
    "2": MeetingDataFactory.createChatPhase("undefined", 2, roomId),
    "3": MeetingDataFactory.createChatPhase("undefined", 3, roomId)
  });

  const fetchAiStream = async ({
    role = "BLUE_HAT",
    chatPhaseId,
    roleType,
    gptType = "HYPER_CLOVA"
  }: {
    role: IHat;
    chatPhaseId: string;
    roleType: "hats" | "title" | "summary";
    gptType?: string;
  }) => {
    if (!userId) return;
    if (roleType === "summary") {
      setSseMeetingData(prev => {
        return {
          ...prev,
          [phase]: {
            ...prev[phase],
            summary: {
              message: prev[phase].summary.message,
              isLoading: true
            }
          }
        };
      });
    }
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
    if (response.status !== 200) {
      if (roleType !== "title") {
        return "isFail";
      }
    }
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
                      message: prev[phase].summary.message + json.message,
                      isLoading: false
                    }
                  }
                };
              });
              setLoadingBtn(false);
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }
    }
  };

  const startAi = async (chatPhaseId: string) => {
    setLoadingBtn(true);
    if (phase === "1") {
      fetchAiStream({
        role: "SUMMARY_ROOM_NAME",
        chatPhaseId,
        roleType: "title",
        gptType: "OPEN_AI"
      });
    }
    let nowGptType = gptType.value;
    for (let i = 0; i < sseMeetingData[phase].aiMessages.length; i++) {
      try {
        const res = await fetchAiStream({
          role: sseMeetingData[phase].aiMessages[i].role,
          chatPhaseId,
          roleType: "hats",
          gptType: nowGptType
        });
        if (res === "isFail") {
          nowGptType = "OPEN_AI";
          changeGptType("OPEN_AI");
          const res = await fetchAiStream({
            role: sseMeetingData[phase].aiMessages[i].role,
            chatPhaseId,
            roleType: "hats",
            gptType: "OPEN_AI"
          });
        }
      } catch (error) {
        if (isStopMeeting[phase].isStop) {
          console.error("Meeting stopped after error.");
          break;
        }
      }
    }
    fetchAiStream({
      role: "SUMMARY",
      chatPhaseId,
      roleType: "summary",
      gptType: gptType.value
    });
  };

  const reStartAi = async () => {
    const errorHat: IHat | null = isStopMeeting[phase].lastRole;
    if (!errorHat) return;
    const chatPhaseId = sseMeetingData[phase].chatPhaseId;
    const errorHatIndex = hatsOrder.indexOf(errorHat);
    let hatsAfterRedHat = [];
    if (errorHatIndex !== -1) {
      hatsAfterRedHat = hatsOrder.slice(errorHatIndex);
    } else {
      return;
    }
    changeGptType("OPEN_AI");
    setLoadingBtn(true);
    for (let i = 0; i < hatsAfterRedHat.length; i++) {
      const res = await fetchAiStream({
        role: hatsAfterRedHat[i],
        chatPhaseId,
        roleType: hatsAfterRedHat[i] === "SUMMARY" ? "summary" : "hats",
        gptType: "OPEN_AI"
      });
    }
    setIsStopMeeting(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        isStop: false
      }
    }));
    setLoadingBtn(false);
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
        return b.phase - a.phase;
      });
      const allRole = [...allHats, constants.SUMMARY];
      if (res[0]) {
        const sortedAiMessages = allRole
          .map(color =>
            res[0].aiMessages.find((item: IAiMessages) => item.role === color)
          )
          .filter(Boolean);
        const lastRole = sortedAiMessages[sortedAiMessages.length - 1].role;
        if (lastRole !== constants.SUMMARY) {
          setIsStopMeeting(prev => ({
            ...prev,
            [phase]: {
              ...prev[phase],
              isStop: true,
              lastRole
            }
          }));
        }
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
              aiMessages: [
                ...prev["1"].aiMessages?.map(message => {
                  const find = res[0].aiMessages.find(
                    (item: IAiMessages) => item.role === message.role
                  );
                  if (find) {
                    return {
                      ...roleInfo(message.role),
                      ...find,
                      aiMessageId: find.id,
                      isFinish: find.message.length > 0
                    };
                  }
                  return message;
                })
              ]
            }
          };
        });
      }
      if (res[1]) {
        const sortedAiMessages = allRole
          .map(color =>
            res[1].aiMessages.find((item: IAiMessages) => item.role === color)
          )
          .filter(Boolean);
        const lastRole = sortedAiMessages[sortedAiMessages.length - 1].role;
        if (lastRole !== constants.SUMMARY) {
          setIsStopMeeting(prev => ({
            ...prev,
            [phase]: {
              ...prev[phase],
              isStop: true,
              lastRole
            }
          }));
        }
        setSseMeetingData(prev => {
          return {
            ...prev,
            ["2"]: {
              ...prev["2"],
              ...res[1],
              summary: {
                ...res[1].aiMessages.find(
                  (ai: IAiMessages) => ai.role === "SUMMARY"
                )
              },
              aiMessages: [
                ...prev["2"].aiMessages?.map(message => {
                  const find = res[1].aiMessages.find(
                    (item: IAiMessages) => item.role === message.role
                  );
                  if (find) {
                    return {
                      ...roleInfo(message.role),
                      ...find,
                      aiMessageId: find.id,
                      isFinish: find.message.length > 0
                    };
                  }
                  return message;
                })
              ]
            }
          };
        });
      }
      if (res[2]) {
        const sortedAiMessages = allRole
          .map(color =>
            res[2].aiMessages.find((item: IAiMessages) => item.role === color)
          )
          .filter(Boolean);
        const lastRole = sortedAiMessages[sortedAiMessages.length - 1].role;
        if (lastRole !== constants.SUMMARY) {
          setIsStopMeeting(prev => ({
            ...prev,
            [phase]: {
              ...prev[phase],
              isStop: true,
              lastRole
            }
          }));
        }
        setSseMeetingData(prev => {
          return {
            ...prev,
            ["3"]: {
              ...prev["3"],
              ...res[2],
              summary: {
                ...res[2].aiMessages.find(
                  (ai: IAiMessages) => ai.role === "SUMMARY"
                )
              },
              aiMessages: [
                ...prev["3"].aiMessages?.map(message => {
                  const find = res[2].aiMessages.find(
                    (item: IAiMessages) => item.role === message.role
                  );
                  if (find) {
                    return {
                      ...roleInfo(message.role),
                      ...find,
                      aiMessageId: find.id,
                      isFinish: find.message.length > 0
                    };
                  }
                  return message;
                })
              ]
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
    queryClient.invalidateQueries({ queryKey: ["bookmark"] });
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
    summaryRoomName,
    reStartAi,
    loadingBtn,
    nowIsStop
  };
};
