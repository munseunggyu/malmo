"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

import styles from "./guideBtn.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchNewMeeting } from "@/services/newMeeting";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  img: StaticImageData;
  alt: string;
  title: string;
  contents: string;
}

export default function GuideBtn({ img, alt, title, contents }: IProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const handleMeeting = async () => {
    if (!user) return;
    const response = await fetchNewMeeting({
      category: title,
      message: contents,
      userId: user.id
    });

    if (response) {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      router.push(
        `/meeting/${response.roomId}?chatPhaseId1=${response.chatPhaseId}&phase=1&isNew=true`
      );
    }
  };

  return (
    <button className={styles.guide_btn} onClick={handleMeeting}>
      <Image src={img} width={40} height={40} alt={alt} />
      <div className='flex flex-col items-start'>
        <span className='caption2 text-grey-5'>{title}</span>
        <p className='mt-xxs text-start whitespace-pre-wrap'>{contents}</p>
      </div>
    </button>
  );
}
