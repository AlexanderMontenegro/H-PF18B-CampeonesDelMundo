import React from 'react';
import { data }  from "../../db/dbherosections";
import "../../css/herosection.css"
import {  useSelector } from "react-redux";

import "../../css/favorite.css";

function HeroSection() {

  const favorites = useSelector((state) => state.favorites);

  return (
    <section className='hero-section'>
        
        <div className='hero-content'>
            <h1>Bienvenido a Campeones del Mundo</h1>
            <p>Encuentra todo lo que necesitas para tu pasion por el deporte...</p>
           
        </div>

        <div className="carousel">
        {data.map((item) => (
          <img key={item.id} src={item.imagen} alt={item.tipo} />
        ))}
        </div>
{/*
<div className="carousel2">
            {favorites.map((productos) => (
              <div className='con_caro' key={productos.id} >

                <img {productos.imagen}/>
              </div>
            ))}
          </div>
*/}


    </section>
      
  )
}

export default HeroSection
