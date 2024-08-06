"use client";
import React from "react";
import GuideGrid from "./GuideGrid";
import CarouselUi from "@/components/ui/CarouselUi";

import green from "../../../public/carousel/green.png";
import black from "../../../public/carousel/black.png";
import red from "../../../public/carousel/red.png";
import blue from "../../../public/carousel/blue.png";
import yellow from "../../../public/carousel/yellow.png";
import white from "../../../public/carousel/white.png";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ModalPortal from "@/components/ui/ModalPortal";
import ModalContainer from "@/components/ui/ModalContainer";
import ChatModal from "@/components/ChatModal";
import { useModal } from "@/hook/useModal";

export default function LoginAfterFirstView() {
  const carouselData = [
    {
      img: green,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=eb2db01e85cc42738f6344ad03d247da&pm=c",
      name: "green"
    },
    {
      img: black,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=ad5ab40190124a9bb4e208cf855fbd4a&pm=c",
      name: "black"
    },
    {
      img: red,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=b64a98d0f13b4c6a8baf11608b6aa12a&pm=c",
      name: "red"
    },
    {
      img: blue,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=fc9bf7c3c16c4d45a9d5d622841615ae&pm=c",
      name: "blue"
    },
    {
      img: yellow,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=3d79365feb2641db93d4ef8a029bbc25&pm=c",
      name: "yellow"
    },
    {
      img: white,
      link: "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457?p=0e8e11971b3342028abe316c923aa36d&pm=c",
      name: "white"
    }
  ];
  const { openModal, handleCloseModal, handleOpenMoal } = useModal();
  return (
    <div className='mx-auto flex flex-col items-center justify-center h-full'>
      <h2 className='title1 leading-[130%] mb-xs w-[669px] text-left'>
        당신의 아이디어를 더욱 빛나게!
      </h2>
      <p className='body1 leading-[130%] mb-[36px] w-[669px] text-left'>
        브레인 스토밍을 돕는 여섯 모자들과 함께 아이디어를 확장시켜봐요!
      </p>
      <div className='flex gap-x-[12px]'>
        <GuideGrid />
        <CarouselUi containerClass={"w-[244px] "}>
          {carouselData.map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              target='_blank'
              className='h-full'
              onDragStart={e => e.preventDefault()}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={244}
                height={440}
                onDragStart={e => e.preventDefault()}
              />
            </a>
          ))}
        </CarouselUi>
      </div>
      <Button onClick={handleOpenMoal} classNames='mt-[40px]'>
        모자와 회의 하러가기 →
      </Button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <ChatModal handleCloseModal={handleCloseModal} isFrist={true} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
