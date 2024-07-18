import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavorites } from '../../Redux/actions';
import ProductoCard from '../ProductoCard/ProductoCard';
import "../../css/favorite.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const Favorite = () => {
  const dispatch = useDispatch();
  const userId = user.uid/* ID del usuario actual */;
  const favorites = useSelector((state) => state.favorites);
  console.log("Favorites:", favorites);

  useEffect(() => {
    dispatch(fetchUserFavorites(userId));
  }, [dispatch, userId]);

  return (

    <div>

    <Header/>
    <div className="favorites-page">
      <h1>Mis Favoritos</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <ProductoCard key={fav.productos.id} producto={fav.productos} />
          ))
        ) : (
          <p>No tienes favoritos aún.</p>
        )}
      </div>
    </div>
<Footer/>
        </div>
  );
};

export default Favorite;
