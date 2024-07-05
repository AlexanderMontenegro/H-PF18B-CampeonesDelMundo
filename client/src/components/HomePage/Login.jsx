import React from "react";
import { Link } from "react-router-dom";

// Componets (Componentes)
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
  return (
    <div>
      {/* <Header
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
            /> */}

      <main>
        {/* Titulo */}
        <h2 className="text-center">Inicia Sesión con tu Cuenta</h2>

        <div className="login__container">
          <div className="login__content">
            {/* Log in */}
            <form className="login__space">
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
                  />
                  <label className="form__label" htmlFor="email">
                    Email
                  </label>

                  {/* {errors.email && <span>{errors.email}</span>} */}

                  {/* {isErrorEmail ? <span>{errors.email}</span> : null} */}
                </div>

                {/* Password */}
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

                  {/* {errors.password && <span>{errors.password}</span>} */}

                  {/* {isErrorPassword? <span>{errors.password}</span>: null} */}
                </div>

                <Link>
                  <p className="p__l">¿Olvido su Contraseña?</p>
                </Link>

                {/* Button - Iniciar Sesion */}
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

                {/* Opciones de Logeo */}


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
                      {/*<h4 className="no-margin no-pading">Google</h4>*/}
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_outlook.png"
                        alt="icon Outlook"
                      />
                     {/*  <h4 className="no-margin no-pading">Outlook</h4>*/}
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_facebook.png"
                        alt="icon Facebook"
                      />
                     {/* <h4 className="no-margin no-pading">Facebook</h4>*/}
                    </div>
                  </Link>

                  <Link className="icono__contentL">
                    <div className="icono__containerL">
                      <img
                        className="icono__fluidL"
                        src="iconos/icon_github.png"
                        alt="icon Github"
                      />
                      {/*<h4 className="no-margin no-pading">Github</h4>*/}
                    </div>
                  </Link>
                </div>

                <p className="text-center">— ¿No tienes una cuenta? —</p>

                {/* Button - Registrar */}
                <div className="form__center">
                  <Link to={"/register"}>
                    <input
                      type="submit"
                      className="form__button"
                      value="Registrate"
                    />
                  </Link>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Login;
