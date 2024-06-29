import React from 'react'
import { Link } from 'react-router-dom';

// Componets (Componentes)
import Header from '../Header/Header'
import Footer from '../Footer/Footer';

// CSS
import "../../css/loginYRegister.css";

const Login = ({carrito, removeFromCarrito, addToCarrito, increaseQuantity, decreaseQuantity, clearCarrito}) => {
    return (
        <div >
            <Header
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
            />

            <main>
                {/* Titulo */}
                <h2 className='text-center'>Inicia Sesión con tu Cuenta</h2>

                <div className='login__container'>

                    {/* Registro - Izquierdo */}
                    <div className='register__left'>
                        {/* Log in */}
                        <form className=' login__space'>
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

                    {/* Registro - Derecho */}
                    <div className='register__right'>
                        <h3>- Registro con -</h3>

                        <Link className='icono__content' to={"https://www.google.com/?hl=es"}>
                            <div className='icono__container'>
                                <img 
                                    className='icono__fluid'
                                    src="iconos/icon_google.png" 
                                    alt="icon Google"
                                />
                                <h4 className='no-margin no-pading'>Google</h4>
                            </div>                          
                        </Link>

                        <Link className='icono__content'>
                            <div className='icono__container'>
                                <img 
                                    className='icono__fluid'
                                    src="iconos/icon_outlook.png" 
                                    alt="icon Outlook"
                                />
                                <h4 className='no-margin no-pading'>Outlook</h4>
                            </div>
                        </Link>

                        <Link className='icono__content'>
                            <div className='icono__container'>
                                <img 
                                    className='icono__fluid'
                                    src="iconos/icon_facebook.png" 
                                    alt="icon Facebook"
                                />
                                <h4 className='no-margin no-pading'>Facebook</h4>
                            </div>
                        </Link>

                        <Link className='icono__content'>
                            <div className='icono__container'>
                                <img 
                                    className='icono__fluid'
                                    src="iconos/icon_github.png" 
                                    alt="icon Github"
                                />
                                <h4 className='no-margin no-pading'>Github</h4>
                            </div>
                        </Link>                      
                        
                    </div> 

                </div>
            </main>
            
            <Footer/>
            
        </div>
    )
}

export default Login