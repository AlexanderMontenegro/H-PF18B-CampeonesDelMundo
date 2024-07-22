import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getDetails } from "../../Redux/actions";


import "../../css/productdetails.css";
import "../../css/header.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../Reviews/ReviewForm";

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

  useEffect(() => {
    getDetails(id);
  }, [id, getDetails]);

  // PARA TALLES
  // State y Effect
  const [selecciontalle, setSeleccionTalle] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  // Funciones
  const handleSelectChange = (event) => {
    const nuevoTalle = event.target.value;

    setSeleccionTalle(nuevoTalle);
    product.talle = nuevoTalle;
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <Header
        carrito={carrito}
        addToCarrito={addToCarrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
        notificaciones={notificaciones}
      />
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
            <div className="product-sizes">
              <label htmlFor="sizes">Talles:</label>
              <select id="sizes" onChange={handleSelectChange}>
                <option value="Seleccione talle">Seleccione talle</option>
                {product.talles.map((obj, index) => (
                  <option key={index} value={obj.talle + " - " + obj.stock}>
                    {obj.talle + " - " + obj.stock}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="product-add-to-cart"
              onClick={() => addToCarrito(product)}
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
              <Reviews productId={product.id}/>
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
