import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// Componets (Componentes)
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// CSS
import "../../css/loginYRegister.css";

import { useDispatch} from "react-redux";
import validation from "./Validation";
import { postLogin } from "../../Redux/actions";
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
    const [login, setLogin] = useState({email:'',password:''});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

      //manejador del estado principal login
  function handleChange(event) {
    event.preventDefault();
    setErrors(validation({
      ...login, [event.target.name]: event.target.value
    })
    );
    setLogin({ ...login, [event.target.name]: event.target.value });
  } 

  // Función para alternar la visibilidad de la contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

    //submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await dispatch(postLogin(login));
        console.log(response.payload);
    
        if (!response.payload.user) {
          Swal.fire({
            icon: "error",
            title: response.payload.message,
            text: "",
            timer: 3000
          }).then(() => {
            // Redirigir después de que la alerta se cierre
            //navigate("/login"); // Cambia la URL al destino 
          });
        }

        //Guardar en el storage
        if (response.payload.user) {
            console.log(response.payload.user);
            window.localStorage.setItem('User', JSON.stringify(response.payload.user));
            const userDispatch = response.payload.user
            //dispatch(setUser(userDispatch));
            Swal.fire({
              icon: "success",
              title: response.payload.message,
              text: "",
              timer: 3000
            }).then(() => {
              // Redirigir después de que la alerta se cierre
              navigate("/homePage"); // Cambia la URL al destino 
              window.location.reload();
            });
          }
    }

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
                                value={login.email}
                                onChange={handleChange}
                            />
                            <label className="form__label" htmlFor="email">
                                Email
                            </label>

                            {errors.email && <span>{errors.email}</span>} 

                  {/* {isErrorEmail ? <span>{errors.email}</span> : null} */}
                </div>

                        {/* Password */}
                        <div className="form__group">

                            <div className='input_password_container'>
                            <input
                            className="form__input"
                            placeholder="Password"
                            name="password"
                            value={login.password || ''} 
                            onChange={handleChange}
                            type={passwordVisible ? 'text' : 'password'}
                            />

                            <button className='show_hide_btn'
                            type="button" 
                            onClick={togglePasswordVisibility}>
                            {passwordVisible 
                            ? <img className='eye' 
                            src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png' />
                             : <img className='eye' 
                             img src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png' />}
                            </button>

                              <label className="form__label" htmlFor="password">
                            Password
                            </label>
                            </div>
                          

                            

                  {/* {errors.password && <span>{errors.password}</span>} */}

                  {/* {isErrorPassword? <span>{errors.password}</span>: null} */}
                </div>

                <Link>
                  <p className="p__l">¿Olvido su Contraseña?</p>
                </Link>

                        {/* Button - Iniciar Sesion */}
                        <div className="form__center">
                        <button onClick={handleSubmit} 
                    type="submit" 
                    className="form__button" >
                    Iniciar Session
                    </button>
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