import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import React from "react";
import HistoryList from "./_component/HistoryList";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <h1 className='py-[24px] px-[68px] text-[20px] font-[600] border-b border-b-bg-3'>
        히스토리
      </h1>

      <HistoryList userId={user.id} />
    </div>
  );
}
