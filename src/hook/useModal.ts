import { useState } from "react";

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenMoal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    handleOpenMoal,
    handleCloseModal,
  };
};
