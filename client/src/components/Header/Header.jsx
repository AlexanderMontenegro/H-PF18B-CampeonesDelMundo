import { useState, React } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components (Componentes)
import Modal from "../Modal/Modal";
import Login from "../HomePage/Login";
import Register from "../HomePage/Register";

// CSS
import "../../css/header.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Notificacion from "../Notificaciones/Notificacion";

const Header = ({
  carrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  notificaciones
}) => {
  // Use States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones
  const isEmpty = () => carrito.length === 0;
  const carritoTotal = () =>
    carrito.reduce((total, item) => total + item.quantity * item.precio, 0);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const closeSession = () => {
    localStorage.clear();

    // navigate("/")
    Swal.fire({
      icon: "success",
      title: "Cerrando session...",
      text: "",
      timer: 3000,
    }).then(() => {
      // Redirigir después de que la alerta se cierre
      navigate("/homePage"); // Cambia la URL al destino
      window.location.reload();
    });
  };

  // const modalLogin = () => {
  //   setIsModalOpen(true);
  // }
  if(!user)
  {
  return (
    <header className="header__homePage">
      <div className="barra__container">
        {/* Lado Izquierdo - logo */}
        <div className="barra__left">
          {/* Logo */}
          <Link to={"/homePage"}>
             
          <h4 className="logo_nombre no-margin"></h4>
          <img
            className="logo_img"
            src="../img/fondo-logo-futbol_1195-244.png"
            />
            </Link>
          </div>

        {/* Lado Derecho - Opciones*/}
        <div className="barra__right">
          {/* Navegacion */}
          <div className="navegacion">
            {/* Inicio */}
            <Link className="navegacion_enlaceC" to={"/homePage"}>
              Inicio
            </Link>
            {/* Productos */}
            <Link className="navegacion_enlaceC" to={"/ProductPage"}>
              Productos
            </Link>
            {/* Contacto */}
            {/* <a className="navegacion_enlaceC">Contacto</a> */}
            <Link className="navegacion_enlaceC" to={"/contacto"}>
              Contacto
            </Link>
            {/* Carrito */}
            {/* <a className="navegacion_enlace">
                                        Carrito
                                    </a> */}

            <div className="carrito">
              <Link className="logo" to={"/Orden"}>
                <img
                  className="icono__fluid"
                  src="/iconos/carrito2a.png"
                  alt="imagen carrito"
                />
              </Link>

                <div id="carrito" className="carrito__container">
                  {isEmpty() ? (
                    <h4 className="navegacion_enlaceC">
                      El carrito esta vacio
                    </h4>
                  ) : (
                    <>
                      <table className="carrito__table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Talles</th>
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
                              <td>{}</td>
                              {console.log("TALLES EN HEADER: ", producto.talles[1])}
                              <td>
                                <div className="cabecera__buttons cabecera__texto">
                                  <button
                                    type="button"
                                    className="cabecera__button"
                                    onClick={() =>
                                      decreaseQuantity(producto.id)
                                    }
                                  >
                                    -
                                  </button>
                                  {producto.quantity}
                                  <button
                                    type="button"
                                    className="cabecera__button"
                                    onClick={() =>
                                      increaseQuantity(producto.id)
                                    }
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

                      <div>
                        <button className="icon__button" onClick={clearCarrito}>
                          Vaciar Carrito
                        </button>
                      </div>
                    </>
                  )}
                </div>
            </div>

            {/* Notificaciones */}
            <div className="notificaciones">
              <Link className="logo" to={"/notificaciones"}>
                <img
                  className="icono__fluid"
                  src="../iconos/notificaciones.png"
                  alt="imagen carrito"
                />
              </Link>
              

              <div id="notificaciones" className="carrito__container">
                <div className="notificationes__lista">
                  {notificaciones.length > 0 ? (
                    notificaciones.map((notificacion, index) => (
                      <Notificacion key={index} notificacion={notificacion} />
                    ))
                  ) : (
                    <p>No hay notificaciones.</p>
                  )}
                </div>    
              </div>

              {isModalOpen && (
                    <Modal>
                      <Login onClose={() => setIsModalOpen(false)} />
                    </Modal>
                  )}
            </div>
            {/* Usuario */}
            <div className="usuario">
              <img
                className="icono__fluid"
                src="../iconos/usuario2a.png"
                alt="imagen carrito"
              />

                <div id="usuario" className="usuario__container">
                  <div className="icon__usuario">
                    <button
                      className="icon__button"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Iniciar Sesion/Registrate
                    </button>
                  </div>

            
                {user && (
                  <div className="icon__usuario">
                    <button onClick={closeSession} className="icon__button">
                      Cerrar Session
                    </button>
                  </div>
                )}
              </div>

              {isModalOpen && (
                    <Modal>
                      <Login onClose={() => setIsModalOpen(false)} />
                    </Modal>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/*  <div className="header_titulo ">
                            
                            <h2 className="no-margin">Todos los Mundiales de la historia:</h2>

                            <p className="no-margin">Campeones, sedes y mejores jugadores</p>
                        </div>*/}
    </header>
  );
}else{
  return (
    <header className="header__homePage">
      <div className="barra__container">
        {/* Lado Izquierdo - logo */}
        <div className="barra__left">
          {/* Logo */}
          <Link to={"/homePage"}>
             
          <h4 className="logo_nombre no-margin"></h4>
          <img
            className="logo_img"
            src="../img/fondo-logo-futbol_1195-244.png"
            />
            </Link>
          </div>

          {/* Lado Derecho - Opciones*/}
          <div className="barra__right">
            {/* Navegacion */}
            <div className="navegacion">
              {/* Inicio */}
              <Link className="navegacion_enlaceC" to={"/homePage"}>
                Inicio
              </Link>
              {/* Productos */}
              <Link className="navegacion_enlaceC" to={"/ProductPage"}>
                Productos
              </Link>
              <Link className="navegacion_enlaceC" to={"/contacto"}>
                Contacto
              </Link>

            <div className="carrito">
              <Link className="logo" to={"/Orden"}>
                <img
                  className="icono__fluid"
                  src="../iconos/carrito2a.png"
                  alt="imagen carrito"
                />
              </Link>

                <div id="carrito" className="carrito__container">
                  {isEmpty() ? (
                    <h4 className="navegacion_enlaceC">
                      El carrito esta vacio
                    </h4>
                  ) : (
                    <>
                      <table className="carrito__table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Talles</th>
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
                              <td className="cabecera__texto">{producto.talles.talle}</td>
                              <td>
                                <div className="cabecera__buttons cabecera__texto">
                                  <button
                                    type="button"
                                    className="cabecera__button"
                                    onClick={() =>
                                      decreaseQuantity(producto.id)
                                    }
                                  >
                                    -
                                  </button>
                                  {producto.quantity}
                                  <button
                                    type="button"
                                    className="cabecera__button"
                                    onClick={() =>
                                      increaseQuantity(producto.id)
                                    }
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

                    <div>
                      <button className="icon__button" onClick={clearCarrito}>
                        Vaciar Carrito
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Usuario */}
            <div className="usuario">
              <img
                className="icono__fluid"
                src="../iconos/usuario2a.png"
                alt="Usuario"
              />

                <div id="usuario" className="usuario__container">

                <p className="icon__user">{user.name}</p> {/** */}
                
                <div className="icon__usuario">
                  <Link className="logo" to="/dashboard">
                    <button className="icon__button">Administrador</button>
                  </Link>
                </div>

                  {user && (
                    <div className="icon__usuario">
                      <button onClick={closeSession} className="icon__button">
                        Cerrar Session
                      </button>
                    </div>
                  )}
                </div>

                {isModalOpen && (
                  <Modal>
                    <Login onClose={() => setIsModalOpen(false)} />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
