import React from 'react'

import { useNavigate, Link } from "react-router-dom";

// Components
import ProductoCard from '../ProductoCard/ProductoCard';
import HeroSection from '../HeroSection/HeroSection';
import Login from './Login';
import Register from './Register';

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
            <header className="header__homePage">
                <div className="barra__container">
                    {/* Lado Izquierdo - logo */}
                    <section className="barra__left">
                        {/* Logo */}
                        <Link className="logo" to={"/homePage"}>
                            <h4 className="logo_nombre no-margin"></h4>
                            <img className='logo_img' src='img\fondo-logo-futbol_1195-244.png'/>
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
                            {/* Contacto */}
                            <a className="navegacion_enlace">
                                Contacto
                            </a>
                            {/* Carrito */}
                            {/* <a className="navegacion_enlace">
                                Carrito
                            </a> */}
                            
                            <div className='carrito'>
                                <img 
                                    className="icono__fluid" 
                                    src="/iconos/carrito.png" 
                                    alt="imagen carrito"
                                />

                                <div id='carrito' className='carrito__container'>
                                    <h4 className='text-center '>El carrito esta vacio</h4>
                                    {/* <table className='carrito__table'>
                                        <thead>
                                            <th></th>
                                         </thead>

                                    </table> */}
                                    <p className="text-end">Total pagar: <span className="fw-bold">$899</span></p>
                                    <button className="icon__button">Vaciar Carrito</button>
                                </div>
                            </div>
                            
                            
                            {/* Usuario */}
                            {/* <a className="navegacion_enlace" onClick={handleEnterToLadingPage}>
                                Usuario
                            </a> */}
                            <div className='usuario'>
                                <img 
                                    className="icono__fluid" 
                                    src="iconos/usuario.png" 
                                    alt="imagen carrito"
                                />

                                <div id='usuario' className='usuario__container'>
                                    
                                    <div className='icon__usuario'>
                                        <Link className="logo" to={"/login"}>
                                            <button className='icon__button'>Iniciar Sesion</button>
                                            
                                        </Link>
                                        
                                    </div>

                                    <div className='icon__usuario'>
                                        <Link className="logo" to={"/register"}>
                                            <button className='icon__button'>Registrate</button>
                                        </Link>                              
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

              {/*  <div className="header_titulo ">
                    
                    <h2 className="no-margin">Todos los Mundiales de la historia:</h2>

                    <p className="no-margin">Campeones, sedes y mejores jugadores</p>
                </div>*/}
            </header>

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