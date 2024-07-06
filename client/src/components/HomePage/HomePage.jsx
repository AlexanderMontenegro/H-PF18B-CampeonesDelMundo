import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductoCard from "../ProductoCard/ProductoCard";
import Pagination from "../Pagination/Pagination";
import HeroSection from "../HeroSection/HeroSection";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Category from "../Category/Category"; 
import "../../css/homePage.css";
import { useSelector } from "react-redux";

const HomePage = ({
  carrito,
  addToCarrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
}) => {
  const productos = useSelector((state) => state.allProducts);
  console.log("Productos", productos);

  // Navegación
  const navigate = useNavigate();

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

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

  return (
    <>

      {/* Hero Section */}
      <div className="hero__category">

      {/* Header */}
      <Header
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />
      <HeroSection />

        <Category />
      </div>
      {/* Main */}
      <main /*className="main-container"*/>
        {/* Categorías */}

        {/* Contenedor para la lista de productos */}
        <div className="product__list">
          {/* Cards */}
          <div/>

          {currentProducts.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              addToCarrito={addToCarrito}
            />
          ))}
        </div>

        

        {/* Paginación */}
        <div className="pagination-container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
