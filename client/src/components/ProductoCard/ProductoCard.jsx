import React from 'react';
import PropTypes from 'prop-types';
import "../../css/productocard.css"

const ProductoCard = ({ producto }) => {

  return (
    <div className="card__container">
      <img src={producto.imagen} alt={`${producto.tipo} ${producto.marca}`} className="card__image" />
      <div className="card__details">
        <h3 className="card__title">{`${producto.tipo} ${producto.marca}`}</h3>
        <p className="card__name">Precio: ${producto.precio}</p>
        <p className="card__name">Talles: {producto.talles.join(', ')}</p>
        <p className="card__name">Categoría: {producto.categoria}</p>
        <p className="card__name">País: {producto.pais}</p>
        <div className="card__buttons">
          <button className="card__cart-button">Agregar al Carrito</button>
          <button className="card__fav-button">Favoritos</button>
        </div>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default ProductoCard;
