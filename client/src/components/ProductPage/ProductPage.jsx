import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductoCard from "../ProductoCard/ProductoCard";
import { getProducts, getCategory } from "../../Redux/actions";
import "../../css/productpage.css";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Searchbar from "../Searchbar/Searchbar";

const ProductPage = ({
  carrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  addToCarrito,
  notificaciones
}) => {
  const dispatch = useDispatch();

  // Cargar productos y categorías cuando el componente se monte
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  // Obtener productos filtrados y ordenados desde el estado global
  const productos = useSelector((state) => state.productos);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productos.length / productsPerPage);

  // Obtener los productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleFilterChange =() =>{
    setCurrentPage(1);
  }

  return (
    <>
      <div className="productpage__header">
        <Header
          carrito={carrito}
          removeFromCarrito={removeFromCarrito}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCarrito={clearCarrito}
          notificaciones={notificaciones}
        />
      </div>

      
      <div className="productpage__full">


      {/*<h4 style={{ textAlign: 'center' }}>Buscador</h4>
       */}
      <div className="searchbar__filter">
        <div className="combinado__syf">
          <Searchbar />
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="product__list">
          {currentProducts.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              addToCarrito={addToCarrito}
            />
          ))}
        </div>
      </div>
        </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <Footer />
    </>
  );
};

export default ProductPage;
