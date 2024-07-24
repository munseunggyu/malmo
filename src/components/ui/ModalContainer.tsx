import React from "react";

interface Props {
  children: React.ReactNode;
  handleCloseModal?: () => void;
}

export default function ModalContainer({ children, handleCloseModal }: Props) {
  const closeModalHandler = handleCloseModal || (() => {});

  return (
    <div
      onClick={closeModalHandler}
      className='w-full h-full flex justify-center fixed z-10 top-0 left-0 right-0 bottom-0 items-center bg-[#000000b3]'
    >
      {children}
    </div>
  );
}
