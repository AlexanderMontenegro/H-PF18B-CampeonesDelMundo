import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Register from "../HomePage/Register";
import "../../css/loginYRegister.css";
import { useDispatch, useSelector } from "react-redux";
import validation from "./Validation";
import {
  postLogin,
  loginWithGoogle,
  loginWithFacebook,
  loginWithGithub,
} from "../../Redux/actions";
import Swal from "sweetalert2";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleAuthSuccess = (user) => {
    const { displayName } = user;
    user = { ...user, name: displayName };
    console.log(user);
    window.localStorage.setItem("User", JSON.stringify(user));
    Swal.fire({
      icon: "success",
      title: "Autenticación Exitosa",
      text: "",
      timer: 3000,
    }).then(() => {
      navigate("/");
    });
  };

  const handleAuthFailure = (message) => {
    Swal.fire({
      icon: "error",
      title: message,
      text: "",
      timer: 3000,
    });
  };

  const signInWithGoogle = async () => {
    const response = await dispatch(loginWithGoogle());
    if (response.payload.user) {
      handleAuthSuccess(response.payload.user);
    } else {
      handleAuthFailure(response.payload.message);
    }
  };

  const signInWithFacebook = async () => {
    const response = await dispatch(loginWithFacebook());
    if (response.payload.user) {
      handleAuthSuccess(response.payload.user);
    } else {
      handleAuthFailure(response.payload.message);
    }
  };

  const signInWithGithub = async () => {
    const response = await dispatch(loginWithGithub());
    if (response.payload.user) {
      handleAuthSuccess(response.payload.user);
    } else {
      handleAuthFailure(response.payload.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/#");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    event.preventDefault();
    setErrors(
      validation({
        ...login,
        [event.target.name]: event.target.value,
      })
    );
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(postLogin(login));
    if (response.payload.user) {
      handleAuthSuccess(response.payload.user);
    } else {
      handleAuthFailure(response.payload.message);
    }
  };

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
        <div className="login__container">
          <div className="login__content">
            <form className="login__space" onSubmit={handleSubmit}>
              <div className="modal__cerrar">
                <button className="modal__button no-margin" onClick={onClose}>
                  X
                </button>
              </div>
              <h3 className="text-center">- Inicia Sesión -</h3>

              <section className="form__top">
                <div className="form__group">
                  <input
                    className="form__input"
                    id="email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleChange}
                  />
                  <label className="form__label" htmlFor="email">
                    Email
                  </label>
                  {errors.email && <span>{errors.email}</span>}
                </div>

                <div className="form__group">
                  <div className="input_password_container">
                    <input
                      className="form__input"
                      placeholder="Password"
                      name="password"
                      value={login.password || ""}
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                    />
                    <button
                      className="show_hide_btn"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <img
                          className="eye"
                          src="https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png"
                          alt="Show"
                        />
                      ) : (
                        <img
                          className="eye"
                          src="https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png"
                          alt="Hide"
                        />
                      )}
                    </button>
                    <label className="form__label" htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>

                <Link to="#">
                  <p className="p__l">¿Olvido su Contraseña?</p>
                </Link>

                <div className="form__center">
                  <button type="submit" className="form__button">
                    Iniciar Sesión
                  </button>
                </div>

                <p className="text-center">— O inicie sesión con —</p>
                <div className="form__optionsL">
                  <Link className="icono__contentL" onClick={signInWithGoogle}>
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_google3.png"
                        alt="icon Google"
                      />
                    </div>
                  </Link>

                  <Link className="icono__contentL" onClick={signInWithFacebook}>
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_facebook3.png"
                        alt="icon Facebook"
                      />
                    </div>
                  </Link>

                  <Link className="icono__contentL" onClick={signInWithGithub}>
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_github3.png"
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
        <Modal>
          <Register onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default Login;
