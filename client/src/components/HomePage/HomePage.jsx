import React from 'react'

import { useNavigate, Link } from "react-router-dom";

// Components
import ProductoCard from '../ProductoCard/ProductoCard';
import HeroSection from '../HeroSection/HeroSection';
import Header from '../Header/Header';

// CSS
import "../../css/homePage.css";

const HomePage = ({productos}) => {


    // NAVEGACIÓN
    // Obtener la función de navegación
    const navigate = useNavigate();

    // 1.-Nav - Hacia Activities
    // ----------------------------
    const handleEnterToLadingPage = () => {
        navigate("/"); // Redirige a la ruta '/login'
    };
    


    return (
        <>
            {/* Header - INICIO */}
            
            <Header/>

            {/* Header - FINAL */}
                    <HeroSection />

            {/* Main - INICIO */}
            <main>
                <div className="main-container">
                    
                    {/* Opciones de Countries */}
                    <h2>Categorias</h2>
            
                        <div className='barra__right'>
                            {/* Navegacion */}
                            <div className="navegacion">
                                {/* Ropa */}
                                <Link className="navegacion_enlace">
                                    Ropa
                                </Link>
                                {/* Calzados */}
                                <Link className="navegacion_enlace">
                                    Calzados
                                </Link>
                                {/* Accesorios */}
                                <Link className="navegacion_enlace">
                                    Accesorios
                                </Link>
                                {/* Marcas */}
                                <Link className="navegacion_enlace">
                                    Marcas
                                </Link>
                            </div>
                        </div>
                        


                    {/* Contenedor para la lista de productos */}
                    <h2>Productos Destacados</h2>
                    {/* Cards */}
                    <div className="product__list">
                        {productos.map((producto) => (
                            <ProductoCard
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </div>

                    {/* Contenedor para la paginación */}
                    {/* <div className="pagination-container">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div> */}

                    {/* Mostrar detalles de un país seleccionado */}
                    {/* {selectedCountryId && (
                        <CountryDetail countryId={selectedCountryId} />
                    )}    */}
                 </div>
            </main>

            <footer className='footer'>
                <p className='no-margin'>&copy; 2024 World Champions - Todos los derechos Reservados</p>
            </footer>
           

        </>
    )
}

export default HomePage