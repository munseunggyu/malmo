import React, { ChangeEventHandler } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface IProps {
  placeholder: string;
  maxRows?: number;
  minRows?: number;
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength?: number;
  classNames?: string;
}

export default function TextArea({
  placeholder,
  maxRows = 4,
  minRows = 4,
  value,
  onChange,
  classNames,
  maxLength = 500
}: IProps) {
  return (
    <ReactTextareaAutosize
      onChange={onChange}
      value={value}
      className={`resize-none  outline-none ${classNames} `}
      maxRows={maxRows}
      maxLength={maxLength}
      minRows={minRows}
      placeholder={placeholder}
    ></ReactTextareaAutosize>
  );
}
