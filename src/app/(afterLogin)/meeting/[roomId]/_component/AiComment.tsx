import React from "react";

export default function AiComment() {
  return (
    <div className='flex gap-x-sm '>
      <div className='bg-blue-500 w-[50px] h-[50px] rounded-[50%]' />
      <div>
        <span>파랑이 | 통솔적 사고</span>
        <p className='text-[#ffffff99] text-[14px] pt-[4px] pb-sm'>
          아이디어를 발전시킬 수 있는 새로운 방향 제공
        </p>
        <p className='whitespace-pre-wrap break-keep font-[400]'>
          생선 요리를 주제로 유튜브 콘텐츠를 만들려고 하시는군요. 그럼 저희
          모자들이 회의를 시작해 보겠습니다.
        </p>
        <div className='flex justify-end gap-x-xs mt-sm'>
          <button className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a]'>
            <span>추가 회의하기</span>
          </button>
          <button className='px-[12px] py-xs border border-bg-3 rounded-md text-grey-9 hover:bg-[#ffffff1a]'>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
