import { React, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

// Components
import ProductoCard from "../ProductoCard/ProductoCard";
import Pagination from "../Pagination/Pagination";
// import {Footer} from '../Footer';
import HeroSection from "../HeroSection/HeroSection";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// CSS
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
  // NAVEGACIÓN
  // Obtener la función de navegación
  const navigate = useNavigate();

  // 1.-Nav - Hacia Activities
  // ----------------------------
  const handleEnterToLadingPage = () => {
    navigate("/"); // Redirige a la ruta '/login'
  };

  /*Paginado*/

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
      {/* Header - INICIO */}

      {/* <Header /> */}
      <Header
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />

      {/* Header - FINAL */}
      <HeroSection />

      {/* Main - INICIO */}
      <main>
        <div className="main-container">
          {/* Opciones de Countries */}
          <h2>Categorias</h2>

          <div className="barra__right no-padding">
            {/* Navegacion */}
            <div className="navegacion">
              {/* Ropa */}
              <Link className="navegacion_enlace">Ropa</Link>
              {/* Calzados */}
              <Link className="navegacion_enlace">Calzados</Link>
              {/* Accesorios */}
              <Link className="navegacion_enlace">Accesorios</Link>
              {/* Marcas */}
              <Link className="navegacion_enlace">Marcas</Link>
            </div>
          </div>

          {/* Contenedor para la lista de productos */}
          <h2>Productos Destacados</h2>
          {/* Cards */}

          {/*
            <div className="product__list">
                {productos.map((producto) => (
                <ProductoCard
                    key={producto.id}
                    producto={producto}
                    addToCarrito={addToCarrito}
                />
                ))}
            </div>
            */}

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
        </div>
      </main>

      <Footer />
    </>
  );
};
export default HomePage;
