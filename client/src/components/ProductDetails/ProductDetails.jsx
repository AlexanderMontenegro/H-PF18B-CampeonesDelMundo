import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../../db/db';
import "../../css/productdetails.css";
import Header from '../Header/Header';



const ProductDetails = () => {
  const { id } = useParams();
  const product = data.find(item => item.id === parseInt(id, 10));

  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  
  return (
  <div>

    <Header/>
    
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
}

export default ProductDetails;
