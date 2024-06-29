import React from 'react'
import { Link } from 'react-router-dom';

// Componets (Componentes)
import Header from '../Header/Header'

// CSS
import "../../css/loginYRegister.css";

const Login = () => {
    return (
        <div >
            <Header/>
            
            {/* Titulo */}
            <h2 className='text-center'>Inicia Sesión con tu Cuenta</h2>

            <div className='contenido_principal'>
                {/* Log in */}
                <form className='form__container login__space'>
                    {/* Datos de la Cuenta */}
                    <section className='form__top'>
                        {/* Email */}
                        <div className='form__group'>
                            <input className="form__input" id='email' placeholder="Email" type="email" name="email"/>
                            <label className="form__label" htmlFor="email">Email</label>

                            {/* {errors.email && <span>{errors.email}</span>} */}
                            
                            {/* {isErrorEmail ? <span>{errors.email}</span> : null} */}
                        </div>

                        {/* Password */}
                        <div className='form__group'>
                            <input className="form__input" placeholder="Password" type="password" name="password"/>
                            <label className="form__label" htmlFor="password">Password</label>

                            {/* {errors.password && <span>{errors.password}</span>} */}
                            
                            {/* {isErrorPassword? <span>{errors.password}</span>: null} */}
                        </div>    

                        {/* Button */}
                        <div className="form__center">
                            <Link to={'/homePage'}>
                                <input type="submit" className='form__button' value="Iniciar Sesión"/> 
                            </Link>
                        </div>
                    </section>
                </form>    
            </div>
            
        </div>
    )
}

export default Login