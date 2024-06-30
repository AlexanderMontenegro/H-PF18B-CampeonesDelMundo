import React from "react";
import { useNavigate, Link } from "react-router-dom";

// CSS 
import "../../css/header.css"


const Header = ({carrito, removeFromCarrito, increaseQuantity, decreaseQuantity, clearCarrito}) => {

    // Funciones
    const isEmpty = () => carrito.length === 0;
    const carritoTotal = () => carrito.reduce((total, item) => total + (item.quantity*item.precio), 0);

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
                        src="iconos/carrito.png"
                        alt="imagen carrito"
                    />

                    <div id="carrito" className="carrito__container">
                        
                        {isEmpty() ? (
                            <h4 className="text-center ">El carrito esta vacio</h4>
                        ) : (
                            <>
                            <table className='carrito__table'>
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Tipo</th>
                                        <th>Marca</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {carrito.map(producto => (
                                            <tr key={producto.id}>
                                                <td>
                                                    <img 
                                                        className="img-fluid" 
                                                        src={producto.imagen}
                                                        alt={`${producto.id, producto.tipo} imagen`}
                                                    />
                                                </td>
                                                <td className=" cabecera__texto">{producto.tipo}</td>
                                                <td className=" cabecera__texto">{producto.marca}</td>
                                                <td className="cabecera__texto">
                                                        ${producto.precio}
                                                </td>
                                                <td>
                                                    <div className="cabecera__buttons cabecera__texto">
                                                        <button
                                                            type="button"
                                                            className="cabecera__button"
                                                            onClick={() => decreaseQuantity(producto.id)}
                                                        >
                                                            -
                                                        </button>
                                                            {producto.quantity}
                                                        <button
                                                            type="button"
                                                            className="cabecera__button"
                                                            onClick={() => increaseQuantity(producto.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    
                                                </td>
                                                <td>
                                                    <button                                               
                                                        type="button"
                                                        className="cabecera__cerrar"
                                                        onClick={() => removeFromCarrito(producto.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            
                            <p className="text-end">
                                Total pagar: <span className="fw-bold">${carritoTotal()}</span>
                            </p>
                            <button className="icon__button" onClick={clearCarrito}>Vaciar Carrito</button>

                            </>
                            
                        )}
                        

                        

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

                        <div className="icon__usuario">
                            <Link className="logo" to="/dashboard">
                                <button className="icon__button">Administrador</button>
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
