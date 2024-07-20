import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites, removeFromFavorites } from "../../Redux/actions";
import Swal from "sweetalert2";
import "../../css/favorite.css";
import Footer from "../Footer/Footer";

const Favoritos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user]);

  const handleRemove = (id) => {
    dispatch(removeFromFavorites(id));
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Producto eliminado de favoritos",
    });
  };

  return (
    <div>
      <div className="favorito">
        <div className="favorites-page">
          <h1>Mis Favoritos</h1>
          <div className="productos-list">
            {favorites.map((producto) => (
              <div key={producto.id} className="producto-card">
                <img src={producto.imagen} alt={producto.nombre} />
                <h2>{producto.nombre}</h2>
                <p>{producto.precio}</p>
                <button onClick={() => handleRemove(producto.id)}>
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
