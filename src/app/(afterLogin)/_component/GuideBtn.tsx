import Image, { StaticImageData } from "next/image";
import React from "react";

import styles from "./guideBtn.module.css";

interface IProps {
  img: StaticImageData;
  alt: string;
  title: string;
  contents: string;
}

export default function GuideBtn({ img, alt, title, contents }: IProps) {
  return (
    <button className={styles.guide_btn}>
      <Image src={img} width={40} height={40} alt={alt} />
      <div className='flex flex-col items-start'>
        <span className='caption2 text-grey-5'>{title}</span>
        <p className='mt-xxs text-start whitespace-pre-wrap'>{contents}</p>
      </div>
    </button>
  );
}
