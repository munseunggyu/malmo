import Image from "next/image";
import React from "react";
import icoNew from "../../public/ico-new.svg";
import icoStar from "../../public/ico-star.svg";
import icoHistoryfile from "../../public/ico-historyfile.svg";
import icoSetting from "../../public/ico-settings.svg";

export default function Navbar() {
  return (
    <nav className='flex flex-col w-[100px] bg-[#4f4f4f] h-screen py-[14px] px-[28px] items-center'>
      <ul className='flex flex-col items-center '>
        <li>Logo</li>
        <li className='pt-[24px]'>
          <button>
            <Image src={icoNew} width={64} height={64} alt='채팅 방 추가' />
          </button>
        </li>
        <li className='pt-[32px]'>
          <button>
            <Image src={icoStar} width={36} height={36} alt='즐겨찾기' />
          </button>
        </li>
        <li className='pt-[28px]'>
          <button>
            <Image src={icoHistoryfile} width={36} height={36} alt='폴더' />
          </button>
        </li>
      </ul>
      <div className='mt-auto'>
        <button>
          <Image src={icoSetting} width={32} height={32} alt='설정' />
        </button>
      </div>
    </nav>
  );
}
