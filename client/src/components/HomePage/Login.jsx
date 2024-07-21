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

  const signInWithGoogle = async () => {
    const response = await dispatch(loginWithGoogle());
    console.log("ress ggoo", response);

    if (!response.payload.user) {
      Swal.fire({
        icon: "error",
        title: response.payload.message,
        text: "",
        timer: 3000,
      });
    }
    if (response.payload.user) {
      let user = response.payload.user;
      const { displayName } = user;
      user = { ...user, name: displayName };
      console.log(user);
      window.localStorage.setItem("User", JSON.stringify(user));
      Swal.fire({
        icon: "success",
        title: "Autenticacion Exitosa",
        text: "",
        timer: 3000,
      }).then(() => {        
        navigate("/"); 
        window.location.reload();
      });
    }
  };
  const signInWithFacebook = async () => {
    const response = await dispatch(loginWithFacebook());
    console.log("ress ggoo", response);

    if (!response.payload.user) {
      Swal.fire({
        icon: "error",
        title: response.payload.message,
        text: "",
        timer: 3000,
      });
    }
    if (response.payload.user) {
      let user = response.payload.user;
      const { displayName } = user;
      user = { ...user, name: displayName };
      console.log(user);
      window.localStorage.setItem("User", JSON.stringify(user));
      Swal.fire({
        icon: "success",
        title: "Autenticacion Exitosa",
        text: "",
        timer: 3000,
      }).then(() => {
        navigate("/");
        window.location.reload();
      });
    }
  };
  const signInWithGithub = async () => {
    const response = await dispatch(loginWithGithub());
    console.log("ress ggoo", response);

    if (!response.payload.user) {
      Swal.fire({
        icon: "error",
        title: response.payload.message,
        text: "",
        timer: 3000,
      });
    }
    if (response.payload.user) {
      let user = response.payload.user;
      const { displayName } = user;
      user = { ...user, name: displayName };
      console.log(user);
      window.localStorage.setItem("User", JSON.stringify(user));
      Swal.fire({
        icon: "success",
        title: "Autenticacion Exitosa",
        text: "",
        timer: 3000,
      }).then(() => {
        navigate("/");
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/#");
    }
  }, [isAuthenticated, navigate]);

  // Manejador del estado principal login
  function handleChange(event) {
    event.preventDefault();
    setErrors(
      validation({
        ...login,
        [event.target.name]: event.target.value,
      })
    );
    setLogin({ ...login, [event.target.name]: event.target.value });
  }

  // Función para alternar la visibilidad de la contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(postLogin(login));
    console.log(response.payload);

    if (!response.payload.user) {
      Swal.fire({
        icon: "error",
        title: response.payload.message,
        text: "",
        timer: 3000,
      });
    }

    // Guardar en el storage
    if (response.payload.user) {
      console.log(response.payload.user);
      window.localStorage.setItem(
        "User",
        JSON.stringify(response.payload.user)
      );
      Swal.fire({
        icon: "success",
        title: response.payload.message,
        text: "",
        timer: 3000,
      }).then(() => {
        // Redirigir después de que la alerta se cierre
        navigate("/homePage"); // Cambia la URL al destino
        window.location.reload();
      });
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

              {/* Datos de la Cuenta */}
              <section className="form__top">
                {/* Email */}
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

                {/* Password */}
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
                  {errors.password && <span>{errors.password}</span>}
                </div>

                <Link to="#">
                  <p className="p__l">¿Olvido su Contraseña?</p>
                </Link>

                {/* Button - Iniciar Sesion */}
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
                  {/**
 
                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_outlook.png"
                        alt="icon Outlook"
                      />
                    </div>
                  </Link>

                      */}
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
