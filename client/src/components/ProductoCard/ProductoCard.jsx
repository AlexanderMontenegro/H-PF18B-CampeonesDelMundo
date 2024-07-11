import React from 'react';
import PropTypes from 'prop-types';
import "../../css/productocard.css"
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto, addToCarrito}) => {

  return (
    <div className="card__container">
    <Link to={`/product/${producto.id}`} className="card__link">
     <img src={producto.imagen} alt={`${producto.tipo} ${producto.marca}`} className="card__image" /></Link>


      <div className="card__details">
        <h3 className="card__title">{`${producto.tipo} ${producto.marca}`}</h3>
        <p className="card__name">Precio: ${producto.precio}</p>
    
        <div className="card__buttons">
          <button 
            className="card__cart-button"
            onClick={() => addToCarrito(producto)}
            ><img className="carrito_img" src="../../../public/iconos/carrito.png" alt="" /></button>
          <button className="card__fav-button"></button>  {/*Para favotiros AGM */}
        </div>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default ProductoCard;
