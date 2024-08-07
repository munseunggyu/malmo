import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import React from "react";
import BookMarksList from "./_component/BookMarksList";
import { redirect } from "next/navigation";

export default async function BookmarkPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/");
  }
  return (
    <div>
      <h1 className='py-[24px] px-[68px] text-[20px] font-[600] border-b border-b-divider-1'>
        저장 공간
      </h1>
      <BookMarksList userId={user.id} />
    </div>
  );
}
