import React, { ComponentPropsWithRef } from "react";

interface IProps extends ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  classNames?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({
  children,
  classNames,
  disabled = false,
  type = "button",
  ...props
}: IProps) {
  return (
    <button
      className={`bg-main text-[#303030] text-[20px] font-[700] disabled:bg-inherit disabled:border disabled:border-[#474747] py-sm px-[79px] rounded-md   ${classNames}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
