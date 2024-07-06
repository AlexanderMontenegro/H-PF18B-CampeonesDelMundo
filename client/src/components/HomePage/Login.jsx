import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Modal from "../Modal/Modal";
import Register from "../HomePage/Register";

// CSS
import "../../css/loginYRegister.css";

const Login = ({
  carrito,
  removeFromCarrito,
  addToCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <main>
       {/*
        <h2 className="text-center">Inicia Sesión con tu Cuenta</h2>
 */}
        <div className="login__container">
          <div className="login__content">
            <form className="login__space">
              <h3 className="text-center">- Inicia Sesión -</h3>
              <section className="form__top">
                <div className="form__group">
                  <input
                    className="form__input"
                    id="email"
                    placeholder="Email"
                    type="email"
                    name="email"
                  />
                  <label className="form__label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="form__group">
                  <input
                    className="form__input"
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                  <label className="form__label" htmlFor="password">
                    Password
                  </label>
                </div>

                <Link>
                  <p className="p__l">¿Olvido su Contraseña?</p>
                </Link>

                <div className="form__center">
                  <Link to={"/homePage"}>
                    <input
                      type="submit"
                      className="form__button"
                      value="Ingresar"
                    />
                  </Link>
                </div>

                <p className="text-center">— O inicie sesión con —</p>

                <div className="form__optionsL">
                  <Link
                    className="icono__contentL"
                    to={"https://www.google.com/?hl=es"}
                  >
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_google.png"
                        alt="icon Google"
                      />
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_outlook.png"
                        alt="icon Outlook"
                      />
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_facebook.png"
                        alt="icon Facebook"
                      />
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_github.png"
                        alt="icon Github"
                      />
                    </div>
                  </Link>
                </div>

                <p className="text-center">— ¿No tienes una cuenta? —</p>

                <div className="form__center">
                  <button
                    type="button"
                    className="form__button"
                    onClick={handleOpenModal}
                  >
                    Registrate
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <Register />
        </Modal>
      )}
    </div>
  );
};

export default Login;
