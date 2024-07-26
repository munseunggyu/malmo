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

export default function LoginAfterFirstView() {
  const link =
    "https://daisy-hacksaw-0a3.notion.site/60055e40a24e4b749d580c9b7ec71457";
  const carouselData = [
    { img: green, link, name: "green" },
    { img: black, link, name: "black" },
    { img: red, link, name: "red" },
    { img: blue, link, name: "blue" },
    { img: yellow, link, name: "yellow" },
    { img: white, link, name: "white" }
  ];
  return (
    <div className='mt-[205px] mx-auto flex flex-col items-center'>
      <h2 className='title1 leading-[130%] mb-xs'>
        당신의 아이디어를 더욱 빛나게!
      </h2>
      <p className='body1 leading-[130%] mb-[36px]'>
        당신의 아이디어를, 보다 멋지게 발전시켜드릴게요 어쩌구 저쩌구 모자 6개가
        어쩌구 저쩌구
      </p>
      <div className='flex gap-x-[12px]'>
        <GuideGrid />
        <CarouselUi containerClass={"w-[244px] "}>
          {carouselData.map((item, idx) => (
            <a href={item.link} key={idx} target='_blank' className='h-full'>
              <Image src={item.img} alt={item.name} width={244} height={440} />
            </a>
          ))}
        </CarouselUi>
      </div>
    </div>
  );
}
