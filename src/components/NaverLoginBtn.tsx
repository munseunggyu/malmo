"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function NaverLoginBtn() {
  const handleSignup = async () => {
    signIn("naver", { redirect: true, callbackUrl: "/" });
  };
  console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_ID);
  console.log(process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return <button onClick={handleSignup}>NaverLoginBtn</button>;
}
