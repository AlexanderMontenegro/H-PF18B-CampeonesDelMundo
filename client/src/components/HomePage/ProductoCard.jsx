import React from "react";

// CSS 
import '../../css/homePage.css'

const ProductoCard = ({producto}) => {

    const { id, tipo, marca, precio, talles, imagen, categoria, pais} = producto;

    return (
        <div className="card__container">

            <p> {id}</p>

            {/* DISEÑO NUEVO */}
            <div className="card__detail">
                <img
                        className="card__image"
                        src={imagen}
                        alt={`${tipo} - ${pais}`}
                    />

                {/* Contenedor datos */}
                <div className="card__info">
                    {/* Marca y Favorito */}
                    <h3>{marca} <span>Favorito</span></h3>

                    {/* Precio */}
                    <h3 className="card__name">
                        {precio}
                    </h3>

                    {/* Categoria */}
                    <h3 className="card__name">
                        {categoria} | <span>{talles}</span>
                    </h3>

                    {/* Pais */}
                    <h3 className="card__name">
                        {pais}
                    </h3>

                </div>

            
            </div>
        </div>
    );
};

export default ProductoCard;
