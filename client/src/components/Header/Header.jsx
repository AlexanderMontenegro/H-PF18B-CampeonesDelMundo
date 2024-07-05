import React from "react";
import { useNavigate, Link } from "react-router-dom";

// CSS
import "../../css/header.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Header = ({
  carrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
}) => {
  // Funciones
  const isEmpty = () => carrito.length === 0;
  const carritoTotal = () =>
    carrito.reduce((total, item) => total + item.quantity * item.precio, 0);
  const user = useSelector(state=>state.user)
  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.clear();

   // navigate("/")
    Swal.fire({
        icon: "success",
        title: "Cerrando session...",
        text: "",
        timer: 3000
    }).then(() => {
        // Redirigir después de que la alerta se cierre
        navigate("/homePage"); // Cambia la URL al destino 
        window.location.reload();
    });
}

  return (
    <header className="header__homePage">
      <div className="barra__container">
        {/* Lado Izquierdo - logo */}
        <section className="barra__left">
          {/* Logo */}

          <h4 className="logo_nombre no-margin"></h4>
          <img
            className="logo_img"
            src="../../../public/img/fondo-logo-futbol_1195-244.png"
          />
        </section>

                {/* Lado Derecho - Opciones*/}
                <section className="barra__right">
                {/* Navegacion */}
                <div className="navegacion">
                    {/* Inicio */}
                    <Link className="navegacion_enlace" to={"/homePage"}>Inicio</Link>
                    {/* Productos */}
                    <Link className="navegacion_enlace"to={"/ProductPage"}>Productos</Link>
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
                    <table className="carrito__table">
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
                        {carrito.map((producto) => (
                          <tr key={producto.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={producto.imagen}
                                alt={`${(producto.id, producto.tipo)} imagen`}
                              />
                            </td>
                            <td className=" cabecera__texto">
                              {producto.tipo}
                            </td>
                            <td className=" cabecera__texto">
                              {producto.marca}
                            </td>
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
                      Total pagar:{" "}
                      <span className="fw-bold">${carritoTotal()}</span>
                    </p>
                    <button className="icon__button" onClick={clearCarrito}>
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>

{/* aqui su nombre del usuario */}
{user&&<p  className="icono__fluid">{user.name}</p>}


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

                {!user &&              
                <div className="icon__usuario">
                  <Link className="logo" to={"/login"}>
                    <button className="icon__button">Iniciar Sesion</button>
                  </Link>
                </div> }

                {!user &&                 
                <div className="icon__usuario">
                  <Link className="logo" to={"/register"}>
                    <button className="icon__button">Registrate</button>
                  </Link>
                </div> }

                {user &&                 
                <div className="icon__usuario">
                    <button className="icon__button" onClick={closeSession}>Cerrar Sesion</button>
                </div> }

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
