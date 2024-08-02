import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LoginAfterFirstView from "./_component/LoginAfterFirstView";
import BeforeLoginView from "./_component/BeforeLoginView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "말모말모",
  description:
    "브레인스토밍을 돕는 여섯 모자들과 함께 아이디어를 확장시켜보아요."
};

export default async function BeforeLoginPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return <BeforeLoginView />;
  }
  return <LoginAfterFirstView />;
}
