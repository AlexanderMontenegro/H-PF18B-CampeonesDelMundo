import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getDetails } from "../../Redux/actions";
import axios from "axios";  

import "../../css/productdetails.css";
import "../../css/header.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Reviews from "../Reviews/Reviews";

const ProductDetails = ({
  carrito,
  addToCarrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  notificaciones,
  product,
  getDetails,
}) => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getDetails(id);
  }, [id, getDetails]);

  // PARA TALLES
  // State y Effect
  const [selecciontalle, setSeleccionTalle] = useState("");
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (product) {
      setIsOn(!product.isDeleted);
    }
  }, [product]);

  const toggleButton = async () => {
    const newState = !isOn;
    setIsOn(newState);
    try {
      if (newState) {
        await axios.put(`/productos/restore/${id}`);
      } else {
        await axios.put(`/productos/delete/${id}`);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      setIsOn(!newState); 
    }
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  // Funciones
  const handleSelectChange = (event) => {
    const nuevoTalle = event.target.value;
    setSeleccionTalle(nuevoTalle);
  };

  return (
    <div>
      <div className="barra">
        <Header
          carrito={carrito}
          addToCarrito={addToCarrito}
          removeFromCarrito={removeFromCarrito}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCarrito={clearCarrito}
          notificaciones={notificaciones}
        />
      </div>
      <div className="container__pd">
        <div className="product-details-container">
          <div className="product-image">
            <img src={product.imagen} alt={product.tipo} />
          </div>

          <div className="product-info">
            <h2 className="product-title">
              {product.tipo} - {product.marca}
            </h2>
            <p className="product-price"> ${product.precio}</p>
            <p className="product-description">
              Descripción <br /> {product.descripcion}
            </p>

            {(user?.role === "admin" || user?.role === "super-admin") && (
              <button className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={toggleButton}>
                {isOn ? 'On' : 'Off'}
              </button>
            )}
            <div className="product-sizes">
              <select
                className="select_s"
                id="sizes"
                onChange={handleSelectChange}
              >
                <option value="Seleccione talle">Talles</option>
                {product.talles.map(
                  (obj, index) =>
                    obj.stock > 0 && (
                      <option key={index} value={obj.talle}>
                        {obj.talle + " - " + obj.stock}
                      </option>
                    )
                )}
              </select>
            </div>
            <button
              className="product-add-to-cart"
              onClick={() =>
                addToCarrito({ ...product, talle: selecciontalle })
              }
              disabled={!selecciontalle}
            >
              {" "}
              <img src="../iconos/carrito.png" alt="" />{" "}
            </button>
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <h3>Reviews</h3>
            {/* Lista de comentarios y puntuaciones */}

            <section className="reviews__content">
              <Reviews productId={product.id} />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.details,
});

const mapDispatchToProps = {
  getDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

