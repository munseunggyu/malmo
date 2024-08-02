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
import { useGptType } from "@/app/stores/gptType";
import Image from "next/image";
import icoArrow from "../../public/ico-arrow.svg";

import styles from "./ChatModal.module.css";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  handleCloseModal: () => void;
  isFrist?: boolean;
  phase?: undefined | string;
  roomId?: undefined | string;
  chooseMessage?: string;
  relyAiMessageId?: string | undefined;
  name?: string;
}

export default function ChatModal({
  handleCloseModal,
  isFrist = false,
  phase,
  roomId,
  relyAiMessageId,
  chooseMessage,
  name
}: IProps) {
  const queryClient = useQueryClient();
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
  const gptType = useGptType(state => state.gptType);
  const changeGptType = useGptType(state => state.changeGptType);

  const [gptToogle, setGptToogle] = useState(false);
  const gptOptions = [
    {
      name: "HyperCLOVA X",
      value: "HYPER_CLOVA"
    },
    {
      name: "GPT-4o mini",
      value: "OPEN_AI"
    }
  ];

  const [message, setMessage] = useState("");
  const changeMessage: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target;
    setMessage(value);
  };

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [openChooseMessage, setOpenChooseMessage] = useState(false);

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
      relyAiMessageId?: number | null;
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
        roomId: Number(roomId),
        relyAiMessageId: relyAiMessageId ? Number(relyAiMessageId) : null
      };
    }
    const response = await fetchNewMeeting(payload);

    if (response) {
      queryClient.invalidateQueries({ queryKey: ["history"] });

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
      handleCloseModal();
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
          {relyAiMessageId && (
            <div>
              <div className='flex mb-[36px] bg-[#ffffff1a] px-[20px] py-[12px] rounded-sm text-[#ffffff99] gap-x-xs max-h-[118px]'>
                <span>{name}:</span>
                <p
                  className={`w-[80%] ${styles.scroll_style} ${
                    openChooseMessage ? " overflow-y-auto" : "truncate"
                  }`}
                >
                  {chooseMessage}
                </p>
                <div
                  onClick={() => setOpenChooseMessage(prev => !prev)}
                  className='ml-auto cursor-pointer'
                >
                  줄이기
                </div>
              </div>
              <h3 className='mt-[36px] mb-sm'>
                선택한 발언에 영향받은 아이디어를 입력해 주세요.
              </h3>
            </div>
          )}

          <TextArea
            placeholder='입력해주세요.'
            value={message}
            onChange={changeMessage}
            classNames={`bg-bg-3 rounded-sm px-[20px] py-[18px] w-full hover_bg font-[600] focus_bg focus:border focus:border-main `}
          />
          <div className='mb-[140px]'>
            <button
              onClick={() => setGptToogle(prev => !prev)}
              type='button'
              className={`w-full flex items-center justify-end text-left  py-[8px] px-[16px] rounded-sm gap-x-xs`}
            >
              <span className={"text-[#ffffff33]"}>{gptType.name}</span>
              <Image
                src={icoArrow}
                alt={gptToogle ? "open" : "close"}
                width={20}
                height={20}
                className={`
                  opacity-[0.2]
                  ${gptToogle ? "" : "origin-center rotate-180 "}`}
              />
            </button>
            {gptToogle && (
              <div className={`relative `}>
                <ul
                  className={`absolute z-10 top-3 right-0 w-[170px] h-[80px] overflow-hidden rounded-sm  border border-bg-3`}
                >
                  {gptOptions.map((option, idx) => (
                    <li
                      key={idx}
                      className={`cursor-pointer py-[8px] z-10 text-white px-sm  tex-center hover:bg-bg-3 ${
                        option.value !== gptType.value ? "text-[#ffffff33]" : ""
                      }`}
                      onClick={() => {
                        setGptToogle(false);
                        changeGptType(option.value);
                      }}
                    >
                      <button type='button'>{option.name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
