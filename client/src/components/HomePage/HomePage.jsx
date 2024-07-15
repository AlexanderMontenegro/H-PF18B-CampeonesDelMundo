

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
import ChatModal from "../Socket/ChatModal";

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

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [username, setUsername] = useState("Usuario");

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const totalPages = Math.ceil(productos.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="hero__category">
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
      <main>
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
      </main>
      <div className="chat-container">
        <button
          className="open-chat-button"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <img className="icono__fluid" src="/iconos/chat.png" alt="" />
        </button>
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          username={username}
        />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
