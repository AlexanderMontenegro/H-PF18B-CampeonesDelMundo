import React, { useState, useEffect } from "react";

// Components (Componentes)
import Header from "../Header/Header";
import Notificacion from "./Notificacion";
import Footer from "../Footer/Footer";

import { Timestamp } from "firebase/firestore";

// CSS
import "../../css/notificaciones.css";

const Notificaciones = ({
  carrito,
  addToCarrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  notificaciones,
}) => {
  return (
    <>
      <Header
        carrito={carrito}
        addToCarrito={addToCarrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
        notificaciones={notificaciones}
      />

      <main className="notificaciones__container">

        <h1>Notificaciones</h1>
        <section className="notificaciones__content">

          
          <div className="notificationes__lista">
            
            
            {notificaciones.length > 0 ? (
              notificaciones.map((notificacion, index) => (
                <Notificacion key={index} notificacion={notificacion} />
              ))
            ) : (
              <p>No hay notificaciones.</p>
            )}
          </div>
        </section>
        

        
      </main>

      <Footer/>
    </>
  );
};

export default Notificaciones;
