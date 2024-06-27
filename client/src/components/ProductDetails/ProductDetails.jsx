import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import "../../css/productdetails.css"

const ProductDetails = () => {

    const product = useSelector(state => state.products.find(p => p.id === productId));

    if (!product) {
      return <p>Producto no encontrado</p>;
    }
    
    return (

        <div className="product-details-container">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            {/* Aquí podrías mostrar la valoración y número de reviews si ya tienes esa información */}
            <p>Descripción: {product.description}</p>
            <select>
              <option value="1">1</option> {/* Ejemplo de selector de cantidad */}
              <option value="2">2</option>
              {/* Más opciones de cantidad */}
            </select>
            <button>Agregar al Carrito</button>
          </div>
          <div className="reviews-section">
            {/* Aquí implementa la sección de reviews */}
            <h3>Reviews</h3>
            {/* Lista de comentarios y puntuaciones */}
          </div>
        </div>
      
    );
  }
  
  export default ProductDetails;
  