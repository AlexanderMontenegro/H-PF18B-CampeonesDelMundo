import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Register from "../HomePage/Register";
import "../../css/loginYRegister.css";
import { useDispatch, useSelector } from "react-redux";
import validation from "./Validation";
import { postLogin, loginWithGoogle } from "../../Redux/actions";
import Swal from "sweetalert2";

const Login = ({
  carrito,
  removeFromCarrito,
  addToCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
}) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const signInWithGoogle = () => {
    console.log("Google sign-in button clicked");  // Línea de depuración
    dispatch(loginWithGoogle());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homePage");
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
                  <button type="button" className="icono__contentL" onClick={signInWithGoogle}>
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_google.png"
                        alt="icon Google"
                      />
                    </div>
                  </button>
                  {/* Agregar otros métodos de inicio de sesión aquí */}
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
