import React from "react";

import { Link } from "react-router-dom";

// Components (Componentes)
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// CSS
import "../../css/loginYRegister.css";

const Register = ({
  carrito,
  addToCarrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
}) => {
  return (
    <>
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
        {/*<h2 className="text-center">Cree una Cuenta con Nosotros</h2>*/}

        <div className="register__container">
          <div className="register__content">
            {/* Register */}

            <form>
              <h3 className="text-center">- Registrate -</h3>

              {/* Datos de la Cuenta */}
              <section className="form__top">
                <h4 className="h4">Datos de la Cuenta</h4>

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

                  {/* {errors.password ? <span>{errors.password}</span>: null} */}
                </div>

                {/* Password */}
                <div className="form__group">
                  <input
                    className="form__input"
                    placeholder="Password"
                    type="password"
                  />
                  <label className="form__label">Password</label>
                </div>

                {/* Confirmar Password */}
                <div className="form__group">
                  <input
                    className="form__input"
                    placeholder="Confirm Password"
                    type="password"
                  />
                  <label className="form__label">Confirma tu Password</label>
                </div>
              </section>

              {/* Datos del Usuario */}
              <section className="form__bottom">
                <h4 className="h4">Datos del Usuario</h4>
                <div className="form__name">
                  {/* Nombres */}
                  <div className="form__group">
                    <input
                      className="form__input"
                      id="name"
                      placeholder="Nombres"
                      type="text"
                      name="name"
                    />
                    <label className="form__label" htmlFor="name">
                      Nombres
                    </label>
                  </div>

                  {/* Apellidos */}
                  <div className="form__country form__group">
                    <input
                      className="form__input"
                      id="lastName"
                      placeholder="Apellidos"
                      type="text"
                      name="lastName"
                    />
                    <label className="form__label" htmlFor="lastName">
                      Apellidos
                    </label>
                  </div>
                </div>

                {/* Pais y Continente */}
                <div className="form__country">
                  {/* Continente */}
                  <div className="form__group">
                    <select
                      className="form__select"
                      id="continent"
                      name="continent"
                    >
                      <option>Continente</option>
                      <option value="Africa">Africa</option>
                      <option value="South America">South America</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </div>

                  {/* Pais */}
                  <div className="form__group">
                    <input
                      className="form__input"
                      id="country"
                      placeholder="País"
                      type="text"
                      name="country"
                    />

                    <label className="form__label" htmlFor="country">
                      País
                    </label>
                  </div>
                </div>
              </section>

              {/* Button - Registre su Cuenta*/}
              <div className="form__center">
                <Link to={"/homePage"}>
                    <button type="submit" className="form__button">
                    Registre su Cuenta
                    </button>
                </Link> 
              </div>

              <p className="text-center">— O registrese con —</p>

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
                    {/*
                    <h4 className="no-margin no-pading">Google</h4>
                     */}
                  </div>
                </Link>

                <Link className="icono__contentL">
                  <div className="icono__containerL">
                    <img
                      className="icono__fluidL"
                      src="iconos/icon_outlook.png"
                      alt="icon Outlook"
                    />
                    {/*
                    <h4 className="no-margin no-pading">Outlook</h4>
                     */}
                  </div>
                </Link>
              
                <Link className="icono__contentL">
                  <div className="icono__containerL">
                    <img
                      className="icono__fluidL"
                      src="iconos/icon_facebook.png"
                      alt="icon Facebook"
                    />
                    {/*
                    <h4 className="no-margin no-pading">Facebook</h4>
                     */}
                  </div>
                </Link>

                <Link className="icono__contentL">
                  <div className="icono__containerL">
                    <img
                      className="icono__fluidL"
                      src="iconos/icon_github.png"
                      alt="icon Github"
                    />
                    {/*
                    <h4 className="no-margin no-pading">Github</h4>
                     */}
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
        
        
      </main>
      {/* <Footer /> */}
    </>
  );
  
};

export default Register;
