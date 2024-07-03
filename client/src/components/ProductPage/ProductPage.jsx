import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductoCard from "../ProductoCard/ProductoCard";
import { getProducts, getCategory } from "../../Redux/actions";
import "../../css/homePage.css";
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
  const productsPerPage = 12;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productos.length / productsPerPage);

  // Obtener los productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />
      <h4 style={{ textAlign: 'center' }}>Buscador</h4>
      <Searchbar/>
      <Filter />      
      <div className="product__list">
        {currentProducts.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            addToCarrito={addToCarrito}
          />
        ))}
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