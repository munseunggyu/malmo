"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./CarouselUi.module.css";

const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1
  }
};

export default function CarouselUi({
  children,
  containerClass
}: {
  children: React.ReactNode;
  containerClass?: string;
}) {
  return (
    <Carousel
      containerClass={`flex gap-2 ${containerClass}`}
      autoPlay={true}
      swipeable={false}
      draggable={true}
      showDots={true}
      infinite={true}
      responsive={responsive}
      autoPlaySpeed={5000}
      dotListClass={styles.custom_dot_list_style}
      arrows={false}
    >
      {children}
    </Carousel>
  );
}
