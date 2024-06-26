import React from 'react'

import { useNavigate, Link } from "react-router-dom";

// CSS
import "../../css/homePage.css"

const HomePage = () => {
    // NAVEGACIÓN
    // Obtener la función de navegación
    const navigate = useNavigate();

    // 1.-Nav - Hacia Activities
    // ----------------------------
    const handleEnterToLadingPage = () => {
        navigate("/"); // Redirige a la ruta '/login'
    };

    return (
        <>
            {/* Header */}
            <header className="header__homePage">
                <div className="barra__container">
                    {/* Lado Izquierdo - logo */}
                    <section className="barra__left">
                        {/* Logo */}
                        <Link className="logo" to={"/homePage"}>
                            <h4 className="logo_nombre no-margin">LOGO</h4>
                        </Link>
                    </section>


                    {/* Lado Derecho - Opciones*/}
                    <section className="barra__right">
                        {/* Navegacion */}
                        <div className="navegacion">
                            {/* Inicio */}
                            <a className="navegacion_enlace">
                                Inicio
                            </a>
                            {/* Productos */}
                            <a className="navegacion_enlace">
                                Productos
                            </a>
                            {/* Carrito */}
                            <a className="navegacion_enlace">
                                Carrito
                            </a>
                            <a className="navegacion_enlace" onClick={handleEnterToLadingPage}>
                                Usuario
                            </a>
                        </div>
                    </section>
                </div>

                <div className="header_titulo ">
                    {/* Titulo */}
                    <h2 className="no-margin">Recuerdos de viaje que nunca olvidarás</h2>

                    <p className="no-margin">Explora el mundo como un lugareño</p>
                </div>
            </header>
        </>
    )
}

export default HomePage