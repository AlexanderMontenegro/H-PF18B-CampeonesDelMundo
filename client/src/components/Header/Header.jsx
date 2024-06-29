import React from "react";
import { useNavigate, Link } from "react-router-dom";

// CSS 
import "../../css/header.css"

const Header = () => {
    return (
        <header className="header__homePage">
            <div className="barra__container">
                {/* Lado Izquierdo - logo */}
                <section className="barra__left">

                {/* Logo */}
                <Link className="logo" to={"/homePage"}>
                    <h4 className="logo_nombre no-margin"></h4>
                    <img
                        className="logo_img"
                        src="../../../public/img/fondo-logo-futbol_1195-244.png"
                    />
                </Link>
                </section>

                {/* Lado Derecho - Opciones*/}
                <section className="barra__right">
                {/* Navegacion */}
                <div className="navegacion">
                    {/* Inicio */}
                    <a className="navegacion_enlace">Inicio</a>
                    {/* Productos */}
                    <a className="navegacion_enlace">Productos</a>
                    {/* Contacto */}
                    <a className="navegacion_enlace">Contacto</a>
                    {/* Carrito */}
                    {/* <a className="navegacion_enlace">
                                        Carrito
                                    </a> */}

                    <div className="carrito">
                    <img
                        className="icono__fluid"
                        src="../../../public/iconos/carrito.png"
                        alt="imagen carrito"
                    />

                    <div id="carrito" className="carrito__container">
                        <h4 className="text-center ">El carrito esta vacio</h4>
                        {/* <table className='carrito__table'>
                                                <thead>
                                                    <th></th>
                                                </thead>

                                            </table> */}
                        <p className="text-end">
                        Total pagar: <span className="fw-bold">$899</span>
                        </p>
                        <button className="icon__button">Vaciar Carrito</button>
                    </div>
                    </div>

                    {/* Usuario */}
                    {/* <a className="navegacion_enlace" onClick={handleEnterToLadingPage}>
                                        Usuario
                                    </a> */}
                    <div className="usuario">
                    <img
                        className="icono__fluid"
                        src="../../../iconos/usuario.png"
                        alt="imagen carrito"
                    />

                    <div id="usuario" className="usuario__container">
                        <div className="icon__usuario">
                            <Link className="logo" to={"/login"}>
                                <button className="icon__button" >Iniciar Sesion</button>
                            </Link>
                        </div>

                        <div className="icon__usuario">
                            <Link className="logo" to={"/register"}>
                                <button className="icon__button">Registrate</button>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>

            {/*  <div className="header_titulo ">
                            
                            <h2 className="no-margin">Todos los Mundiales de la historia:</h2>

                            <p className="no-margin">Campeones, sedes y mejores jugadores</p>
                        </div>*/}
        </header>
    );
};

export default Header;
