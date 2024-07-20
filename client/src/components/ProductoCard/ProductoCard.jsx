import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../Redux/actions';
import "../../css/productocard.css";

const ProductoCard = ({ producto, addToCarrito }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === producto.id);

  const handleFavoriteClick = () => {
    console.log("Favorito Clicked:", producto.id,producto);
    if (isFavorite) {
      dispatch(removeFromFavorites(producto.id));
    } else {
      dispatch(addToFavorites(producto));
    }
  };

  return (
    <div className="card__container">
      <Link to={`/product/${producto.id}`} className="card__link">
        <img src={producto.imagen} alt={`${producto.tipo} ${producto.marca}`} className="card__image" />
      </Link>
      <div className="card__details">
        <h3 className="card__title">{`${producto.tipo} ${producto.marca}`}</h3>
        <p className="card__name">Precio: ${producto.precio}</p>
        <div className="card__buttons">
          <button 
            className="card__cart-button"
            onClick={() => addToCarrito(producto)}
          >
            <img className="carrito_img" src="../iconos/carrito.png" alt="" />
          </button>
          <button 
            className="card__fav-button" 
            onClick={handleFavoriteClick}
          >

            <div className='corazon'>

            {isFavorite   ? '❤️' : '♡'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductoCard.propTypes = {
  producto: PropTypes.object.isRequired,
  addToCarrito: PropTypes.func.isRequired,
};

export default ProductoCard;
