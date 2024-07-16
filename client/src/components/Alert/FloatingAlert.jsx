import React, { useState } from "react";
import "../../css/floatingalert.css";
import Modal from "../Modal/Modal";
import Login from "../HomePage/Login"; 

const FloatingAlert = () => {
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {visible && (
        <div className="floating-alert">
          <div className="alert-content">
            <button className="close-btn" onClick={handleClose}>
              <img src="/iconos/delete.png" alt="" />
            </button>
            <img
              src="img/equipaciones-copa-america-2024-e.png"
              alt="Oferta especial"
            />
            <h3>No te pierdas nuestras grandes ofertas esta temporada.</h3>
            <button className="icon__button" onClick={handleOpenModal}>
              Iniciar Sesión/Registrarse
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Login onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default FloatingAlert;
