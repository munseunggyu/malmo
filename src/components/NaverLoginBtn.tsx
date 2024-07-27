"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

import naverImg from "../../public/naver-login.png";

export default function NaverLoginBtn() {
  const handleSignup = async () => {
    // signIn("naver", { redirect: true, callbackUrl: "/" });
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/"
    });
  };
  return (
    <button onClick={handleSignup}>
      <Image src={naverImg} alt='네이버 로그인' width={380} height={72} />
    </button>
  );
}
