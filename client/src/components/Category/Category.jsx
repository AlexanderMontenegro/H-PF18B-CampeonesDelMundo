import React from 'react';
import { Link } from 'react-router-dom'; 
import "../../css/categoria.css"

function Category() {
  return (
    <div className="container_scategoria">
      {/* Opciones de Categorías */}
    {/*  <h2 className='h2'>Categorías</h2>*/}

      <div className="barra_categoria">
        {/* Navegación */}
        <div className="navegacion">
          {/* Ropa */}
          <Link to="/ropa" className="navegacion_enlace">Ropa</Link>
          {/* Calzados */}
          <Link to="/calzados" className="navegacion_enlace">Calzados</Link>
          {/* Accesorios */}
          <Link to="/accesorios" className="navegacion_enlace">Accesorios</Link>
          {/* Marcas */}
          <Link to="/marcas" className="navegacion_enlace">Marcas</Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
