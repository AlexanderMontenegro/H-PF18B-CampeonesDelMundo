import { React,useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductoCard from "../ProductoCard/ProductoCard";
import { useSelector } from "react-redux";
import "../../css/homePage.css";
import Pagination from "../Pagination/Pagination";

const ProductPage = ({
  carrito,
  removeFromCarrito,
  increaseQuantity,
  decreaseQuantity,
  clearCarrito,
  addToCarrito,
}) => {
  const productos = useSelector((state) => state.allProducts);
  /*Paginado*/

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
      setCurrentPage(pageNumber);};
  return (
    <>
    
      <Header
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />
      <h4 className="text-center">PAGINA DE PRODUCTOS</h4>
      <h3 className="text-center">SEARCHBAR</h3>
      <div className="product__list">
        {currentProducts.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            addToCarrito={addToCarrito}
          />
        ))}
        <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        
        
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
