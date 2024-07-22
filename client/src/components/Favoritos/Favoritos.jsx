import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites, removeFromFavorites } from "../../Redux/actions";
import Swal from "sweetalert2";
import "../../css/favorite.css";
import Footer from "../Footer/Footer";

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
    <div>
      <div className="favorito">
        <div className="favorites-page">
          <h1>Mis Favoritos</h1>
          <div className="productos-list">
            {favorites.map((productos) => (
              <div key={productos.id} className="producto-card">

                {/*
                <div>{JSON.stringify(producto)}</div>
                */}

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
