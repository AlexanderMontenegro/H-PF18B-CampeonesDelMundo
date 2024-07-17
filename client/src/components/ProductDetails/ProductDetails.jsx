import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getDetails } from "../../Redux/actions";
import "../../css/productdetails.css";
import "../../css/header.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProductDetails = ({
  carrito,
  addToCarrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  product,
  getDetails,
  notificaciones,
}) => {
  const { id } = useParams();


  useEffect(() => {
    getDetails(id);
  }, [id, getDetails]);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const EncontrarTalles = () => {

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
              <select id="sizes">
                {product.talles.map(obj => (
                  <option key={obj.id} onClick={() => EncontrarTalles(obj)}>
                    {obj.talle}-{obj.stock}
                    {/* {console.log("El stock es: ", obj.talle)} */}
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
          <div className="reviews-section">
            <h3>Reviews</h3>
            {/* Lista de comentarios y puntuaciones */}
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
