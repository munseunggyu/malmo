"use client";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function BeforeLoginPage() {
  const { data } = useSession();
  if (data?.user) {
    redirect("home");
  }
  return (
    <div className="bg-[url('/first-bg.png')] bg-cover bg-center h-full ">
      <div className='flex justify-center pt-[21%]'>
        <Button>모자와 회의 하러가기 →</Button>
      </div>
    </div>
  );
}
