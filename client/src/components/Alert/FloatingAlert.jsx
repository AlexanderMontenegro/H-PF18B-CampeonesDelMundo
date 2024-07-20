import React, { useState, useEffect } from "react";
import "../../css/floatingalert.css";
import Modal from "../Modal/Modal";
import Login from "../HomePage/Login";

const FloatingAlert = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const showAlert = () => {
      setVisible(true);
      const currentTime = new Date().getTime();
      localStorage.setItem('lastAlertTime', currentTime.toString());
    };

    const lastAlertTime = localStorage.getItem('lastAlertTime');
    const currentTime = new Date().getTime();
    const THIRTY_MINUTES =  15 * 30 * 1000;

    if (!lastAlertTime || currentTime - parseInt(lastAlertTime, 15) >= THIRTY_MINUTES) {
      showAlert();
    }
  }, []);

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
              <img src="/iconos/delete.png" alt="Cerrar" />
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
