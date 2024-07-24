"use client";
import { useState } from "react";
import divider from "../../../public/divider.svg";
import icoArrow from "../../../public/ico-arrow.svg";

import styles from "./dropdown.module.css";
import Image from "next/image";

interface IProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

const Dropdown = ({ selectedOption, setSelectedOption, options }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const bgColor = isOpen ? styles.open_bg : "bg-bg-3";

  return (
    <div className={`relative w-full`}>
      <div>
        <button
          onClick={toggleDropdown}
          type='button'
          className={`w-full flex items-center justify-between text-left ${bgColor} py-[24px] px-[20px] rounded-sm  ${
            isOpen
              ? "rounded-b-none border border-b-0 border-main "
              : `${styles.select_btn}`
          } `}
        >
          <span
            className={
              selectedOption === "선택해 주세요." ? "opacity-[0.6]" : ""
            }
          >
            {selectedOption}
          </span>
          <Image
            src={icoArrow}
            alt={isOpen ? "open" : "close"}
            width={32}
            height={32}
            className={isOpen ? "" : "origin-center rotate-180"}
          />
        </button>
      </div>
      {isOpen && (
        <>
          <div
            className={`px-[20px] ${bgColor} border border-b-0 border-main border-t-0`}
          >
            <Image
              src={divider}
              alt='구분선'
              width={110}
              height={0}
              style={{ width: "100%" }}
            />
          </div>
          <ul
            className={`absolute z-10 w-full overflow-hidden rounded-sm rounded-t-none ${
              isOpen ? "border border-t-0 border-main" : ""
            } `}
          >
            {options.map((option, idx) => (
              <li
                key={option}
                className={`cursor-pointer px-[20px] z-10 text-white py-sm  ${bgColor}  ${styles.category_list}`}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                <button>{option}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dropdown;
