import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

// CSS
import "../../css/loginYRegister.css";

import validation from './Validation';
import { postUser } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Register = ({onClose}) => {

const dispatch = useDispatch();
const navigate = useNavigate();
  const [user, setUser] = useState({
    email:'',
    password:'',
    name:'',
    confirmPassword:'',
    address:'',
    cellphone:''  
  });
  const [errors, setErrors] = useState({email:'Escribi tu Email'});

// Manejador del estado principal
function handleChange(event) {      
event.preventDefault();



setErrors(validation({...user,[event.target.name] : event.target.value}));
setUser({...user,[event.target.name]:event.target.value})
}

//submit
const handleSubmit= async (event)=>{
  event.preventDefault();
  const response = await dispatch(postUser(user));
  
  if(response.payload.userRecord)
      {
     Swal.fire({
      icon: "success",
      title: response.payload.message,
      text: "",
      timer: 3000
    }).then(() => {
      // Redirigir después de que la alerta se cierre
      navigate("https://h-pf18b-campeonesdelmundo-1-lk3c.onrender.com/"); // Cambia la URL al destino 
      window.location.reload();
    });         
      }else{
          Swal.fire({
              icon: "error",
              title: response.payload.message,
              text: "",
              timer: 3000
            })   
      }

};
  
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
              <div className='modal__cerrar'>
                  <button className='modal__button no-margin' onClick={onClose}>X</button>
                </div>
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
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label className="form__label" htmlFor="email">
                    Email
                  </label>

                  {errors.email ? <span>{errors.email}</span>: null}
                </div>

                {/* Password */}
                <div className="form__group">
                  <input
                    className="form__input"
                    placeholder="Password"
                    type="password"
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                  />
                  <label className="form__label">Password</label>
                  {errors.password ? <span>{errors.password}</span>: null}
                </div>

                {/* Confirmar Password */}
                <div className="form__group">
                  <input
                    className="form__input"
                    placeholder="Confirm Password"
                    type="password"
                    name='confirmPassword'
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />
                  <label className="form__label">Confirma tu Password</label>
                  {errors.confirmPassword ? <span>{errors.confirmPassword}</span>: null}
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
                      value={user.name}
                      onChange={handleChange}
                    />
                    <label className="form__label" htmlFor="name">
                      Nombres
                    </label>
                    {errors.name ? <span>{errors.name}</span>: null}
                  </div>

                    {/* Direccion */}
                    <div className="form__group">
                    <input
                      className="form__input"
                      id="address"
                      placeholder="Direccion"
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />
                    <label className="form__label" htmlFor="name">
                      Direccion
                    </label>
                    {errors.address ? <span>{errors.address}</span>: null}
                  </div>

                    {/* celular*/}
                    <div className="form__group">
                    <input
                      className="form__input"
                      id="cellphone"
                      placeholder="Direccion"
                      type="text"
                      name="cellphone"
                      value={user.cellphone}
                      onChange={handleChange}
                    />
                    <label className="form__label" htmlFor="name">
                      Celular
                    </label>
                    {errors.cellphone ? <span>{errors.cellphone}</span>: null}
                  </div>

                  {/* Apellidos */}
{/*                   <div className="form__country form__group">
                    <input
                      className="form__input"
                      id="lastName"
                      placeholder="Apellidos"
                      type="text"
                      name="lastName"
                      value={user.lastName}
                    />
                    <label className="form__label" htmlFor="lastName">
                      Apellidos
                    </label>
                    {errors.lastName ? <span>{errors.lastName}</span>: null}
                  </div>*/}
                </div> 

                {/* Pais y Continente */}
               {/*  <div className="form__country"> */}
                  {/* Continente */}
{/*                   <div className="form__group">
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
 */}
                  {/* Pais */}
{/*                   <div className="form__group">
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
                  </div> */}
               {/*  </div> */}
              </section> 

              {/* Button - Registre su Cuenta*/}
              <div className="form__center">
                    <button 
                    onClick={handleSubmit} 
                    type="submit" 
                    className="form__button"
                    disabled={Object.keys(errors).length === 0? false : true} >
                    Registre su Cuenta
                    </button>
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
                      src="iconos/icon_google3.png"
                      alt="icon Google"
                    />
                    {/*
                    <h4 className="no-margin no-pading">Google</h4>
                     */}
                  </div>
                </Link>
{/* 
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
              
                <Link className="icono__contentL">
                  <div className="icono__containerL">
                    <img
                      className="icono__fluidL"
                      src="iconos/icon_facebook3.png"
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
                      src="iconos/icon_github3.png"
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
