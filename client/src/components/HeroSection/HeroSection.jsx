import React from 'react';
import { data }  from "../../db/db";
import "../../css/herosection.css"


function HeroSection() {
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

    </section>
      
  )
}

export default HeroSection
