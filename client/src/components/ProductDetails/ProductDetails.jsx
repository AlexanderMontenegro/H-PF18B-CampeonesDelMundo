import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetails } from '../../Redux/actions'; // Ajusta la ruta según tu estructura de archivos
import "../../css/productdetails.css";
import Header from '../Header/Header';

const ProductDetails = ({carrito, addToCarrito, removeFromCarrito, increaseQuantity, decreaseQuantity, clearCarrito, product, getDetails}) => {
  const { id } = useParams();

  useEffect(() => {
    getDetails(id);
  }, [id, getDetails]);

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
      />
    
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.imagen} alt={product.tipo} />
        </div>
        <div className="product-info">
          <h2>{product.tipo} - {product.marca}</h2>
          <p>Precio: ${product.precio}</p>
          <p>Valoración:</p>
          <p>Descripción: {product.descripcion}</p>
          <div className="product-sizes">
            <label htmlFor="sizes">Talles:</label>
            <select id="sizes">
              {product.talles.map((talle, index) => (
                <option key={index} value={talle}>{talle}</option>
              ))}
            </select>
          </div>
          <button className='button__carrito'>Agregar al Carrito</button>
        </div>
        <div className="reviews-section">
          <h3>Reviews</h3>
          {/* Lista de comentarios y puntuaciones */}
        </div>
      </div>
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
