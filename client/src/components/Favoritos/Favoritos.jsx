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
    <div className="contenedor__fav_f">
      <div className="header_img">
        <Header />
      </div>
      <div className="favorito_f">
        <div className="favorites-page_f">
          <h1>Mis Favoritos</h1>
          <div className="productos-list_f">
            {favorites.map((productos) => (
              <div key={productos.id} className="producto-card_f">
                {/*<div>{JSON.stringify(productos)}</div>*/}
                <div className="contenido_f" >

                <img className="img_f" src={productos.producto.imagen} alt={productos.nombre} />
                <h2 className="h2_f" >{productos.producto.descripcion}</h2>
                <p className="p_f" >${ productos.producto.precio}</p>
                <button className="b_f" onClick={() => handleRemove(productos.id)}>
                  Eliminar
                </button>
                </div>
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
