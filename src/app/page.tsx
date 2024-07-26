import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LoginAfterFirstView from "./_component/LoginAfterFirstView";
import BeforeLoginView from "./_component/BeforeLoginView";

export default async function BeforeLoginPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return <BeforeLoginView />;
  }
  return <LoginAfterFirstView />;
}
