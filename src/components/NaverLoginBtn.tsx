"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function NaverLoginBtn() {
  const handleSignup = async () => {
    signIn("naver", { redirect: true, callbackUrl: "/" });
  };
  return <button onClick={handleSignup}>NaverLoginBtn</button>;
}
