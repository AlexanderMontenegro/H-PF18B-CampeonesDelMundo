import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites, removeFromFavorites } from "../../Redux/actions";
import Swal from "sweetalert2";
import "../../css/favorite.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Favoritos = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("User"));
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (user && user.email) {
      dispatch(fetchUserFavorites(user.email));
    }
  }, [dispatch, user?.email]);

  const handleRemove = (id) => {
    dispatch(removeFromFavorites(id));
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Producto eliminado de favoritos",
    });
  };

  return (
    <div className="contenedor__fav">
      <div className="header_img">
        <Header />
      </div>
      <div className="favorito">
        <div className="favorites-page">
          <h1>Mis Favoritos</h1>
          <div className="productos-list">
            {favorites.map((productos) => (
              <div key={productos.id} className="producto-card">
                {/*<div>{JSON.stringify(productos)}</div>*/}
                <h2>{productos.id}</h2>
                <h2>{productos.user_id}</h2>
                <h2>{productos.productos_id}</h2>

                <img src={productos.imagen} alt={productos.nombre} />
                <h2>{productos.nombre}</h2>
                <p>{productos.precio}</p>
                <button onClick={() => handleRemove(productos.id)}>
                  Eliminar
                </button>
               
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favoritos;
