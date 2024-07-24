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

interface IProps {
  handleCloseModal: () => void;
}

export default function ChatModal({ handleCloseModal }: IProps) {
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

  useEffect(() => {
    if (selectedOption !== "선택해 주세요." && message.length > 0)
      setDisabledBtn(false);
    if (message.length === 0) setDisabledBtn(true);
  }, [selectedOption, message]);
  return (
    <div
      className='bg-bg-1 max-w-[1052px] w-full pt-[92px] pb-[60px] px-[176px] mx-md'
      onClick={handleStopPropgation}
    >
      <div className='mx-auto'>
        <h2 className='text-[36px] font-[600] pb-[44px]'>
          회의에 앞서, 자신의 아이디어를 입력해 주세요.
        </h2>
        <form>
          <p className='button1 mb-sm'>어떤 분야에 대한 아이디어인가요?</p>
          <Dropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={options}
          />
          <p className='mt-[60px] mb-sm button1'>
            회의하고 싶은 아이디어를 입력해 주세요.
          </p>
          <TextArea
            placeholder='입력해주세요.'
            value={message}
            onChange={changeMessage}
            classNames={`bg-bg-3 rounded-sm px-[20px] py-[24px] w-full hover_bg subtitle1 focus_bg focus:border focus:border-main mb-[140px]`}
          />
          <Button disabled={disabledBtn} classNames='block mx-auto'>
            모자와 회의하기 →
          </Button>
        </form>
      </div>
    </div>
  );
}
