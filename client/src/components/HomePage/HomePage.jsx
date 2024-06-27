import React from 'react'

import { useNavigate, Link } from "react-router-dom";

// Components
import ProductoCard from '../ProductoCard/ProductoCard';

// CSS
import "../../css/homePage.css"

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
            <header className="header__homePage">
                <div className="barra__container">
                    {/* Lado Izquierdo - logo */}
                    <section className="barra__left">
                        {/* Logo */}
                        <Link className="logo" to={"/homePage"}>
                            <h4 className="logo_nombre no-margin">LOGO</h4>
                        </Link>
                    </section>


                    {/* Lado Derecho - Opciones*/}
                    <section className="barra__right">
                        {/* Navegacion */}
                        <div className="navegacion">
                            {/* Inicio */}
                            <a className="navegacion_enlace">
                                Inicio
                            </a>
                            {/* Productos */}
                            <a className="navegacion_enlace">
                                Productos
                            </a>
                            {/* Carrito */}
                            <a className="navegacion_enlace">
                                Carrito
                            </a>
                            <a className="navegacion_enlace" onClick={handleEnterToLadingPage}>
                                Usuario
                            </a>
                        </div>
                    </section>
                </div>

                <div className="header_titulo ">
                    {/* Titulo */}
                    <h2 className="no-margin">Todos los Mundiales de la historia:</h2>

                    <p className="no-margin">Campeones, sedes y mejores jugadores</p>
                </div>
            </header>

            {/* Header - FINAL */}

            {/* Main - INICIO */}
            <main>
                <div className="main-container">
                    
                    {/* Opciones de Countries */}
                    <h2>Categorias</h2>
            
                        <div className='barra__right'>
                            {/* Navegacion */}
                            <div className="navegacion">
                                {/* Ropa */}
                                <a className="navegacion_enlace">
                                    Ropa
                                </a>
                                {/* Calzados */}
                                <a className="navegacion_enlace">
                                    Calzados
                                </a>
                                {/* Accesorios */}
                                <a className="navegacion_enlace">
                                    Accesorios
                                </a>
                                {/* Marcas */}
                                <a className="navegacion_enlace">
                                    Marcas
                                </a>
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