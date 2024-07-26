"use client";

import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import Dropdown from "./ui/Dropdown";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";
import { fetchNewMeeting } from "@/services/newMeeting";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  handleCloseModal: () => void;
  isFrist?: boolean;
  phase?: undefined | string;
  roomId?: undefined | string;
}

export default function ChatModal({
  handleCloseModal,
  isFrist = false,
  phase,
  roomId
}: IProps) {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const searchParams = useSearchParams();
  const chatPhaseId1 = searchParams.get("chatPhaseId1") || "";
  const chatPhaseId2 = searchParams.get("chatPhaseId2") || "";
  const chatPhaseId3 = searchParams.get("chatPhaseId3") || "";
  const [selectedOption, setSelectedOption] = useState("선택해 주세요.");

  const options = [
    "유튜브",
    "블로그",
    "사업 아이템",
    "사이드 프로젝트",
    "기타"
  ];

  const [message, setMessage] = useState("");
  const changeMessage: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target;
    setMessage(value);
  };

  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleStopPropgation: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
  };

  const handleCreateMeeting = async () => {
    if (!user) return;
    let payload: {
      category?: string;
      message: string;
      userId: string;
      roomId?: number | null;
    } = {
      category: selectedOption,
      message,
      userId: user.id
    };
    if (isFrist) {
      payload = {
        category: selectedOption,
        message,
        userId: user.id
      };
    } else {
      payload = {
        message,
        userId: user.id,
        roomId: Number(roomId)
      };
    }
    const response = await fetchNewMeeting(payload);

    if (response) {
      let url = "";
      if (isFrist) {
        router.push(
          `/meeting/${response.roomId}?chatPhaseId1=${response.chatPhaseId}&phase=1&isNew=true`
        );
      } else {
        handleCloseModal();
        router.push(
          `/meeting/${
            response.roomId
          }?chatPhaseId1=${chatPhaseId1}&chatPhaseId2=${
            response.phase === 2 ? response.chatPhaseId : chatPhaseId2
          }&chatPhaseId3=${
            response.phase === 3 ? response.chatPhaseId : chatPhaseId3
          }&phase=${response.phase}&isNew=true`
        );
      }
    }
  };

  useEffect(() => {
    if (message.length > 0 && !isFrist) {
      setDisabledBtn(false);
      return;
    }
    if (selectedOption !== "선택해 주세요." && message.length > 0)
      setDisabledBtn(false);
    if (message.length === 0) setDisabledBtn(true);
  }, [selectedOption, message, isFrist]);

  return (
    <div
      className='bg-bg-1 max-w-[1052px] w-full pt-[80px] pb-[60px] px-[88px] mx-md'
      onClick={handleStopPropgation}
    >
      <div className='mx-auto'>
        <h2 className='text-[24px] font-[600] pb-[44px]'>
          {isFrist
            ? "회의에 앞서, 자신의 아이디어를 입력해 주세요."
            : "추가 회의를 위해, 아이디어를 입력해 주세요."}
        </h2>
        <form>
          {isFrist && (
            <>
              <p className='title2 mb-sm'>어떤 분야에 대한 아이디어인가요?</p>
              <Dropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={options}
              />
              <p className='mt-[60px] mb-sm title2'>
                회의하고 싶은 아이디어를 입력해 주세요.
              </p>
            </>
          )}
          <TextArea
            placeholder='입력해주세요.'
            value={message}
            onChange={changeMessage}
            classNames={`bg-bg-3 rounded-sm px-[20px] py-[18px] w-full hover_bg font-[600] focus_bg focus:border focus:border-main mb-[140px]`}
          />
          <Button
            disabled={disabledBtn}
            classNames='block mx-auto'
            onClick={handleCreateMeeting}
          >
            모자와 회의하기 →
          </Button>
        </form>
      </div>
    </div>
  );
}
