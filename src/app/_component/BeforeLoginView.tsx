import React from "react";
import LoginModalBtn from "../_component/LoginModalBtn";

export default async function BeforeLoginView() {
  return (
    <div className="bg-[url('/first-bg.webp')] bg-cover bg-center h-full relative">
      <div className='h-full flex flex-col justify-center items-center '>
        <h1 className='text-[60px] text-center'>
          당신의 아이디어를 더욱 빛나게!
          <br />
          말하는 모자, <span className='text-main font-[800]'>말모말모</span>
        </h1>
        <p className='opacity-[0.8] text-[20px] pt-xs pb-[40px]'>
          여섯모자가 6개의 관점으로 브레인스토밍을 도울게요.
        </p>
        <LoginModalBtn />
      </div>
    </div>
  );
}
