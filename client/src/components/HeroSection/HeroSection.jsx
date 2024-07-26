import React, { useRef } from 'react';
import { data }  from "../../db/dbherosections";
import "../../css/herosection.css";
import { useSelector } from "react-redux";

function HeroSection() {
 
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <section className='hero-section'>
      <div className='hero-content'>
        <h1>Bienvenido a Campeones del Mundo</h1>
        <p>Encuentra todo lo que necesitas para tu pasión por el deporte...</p>
      </div>

      <div className="carousel-container">
        <button className="carousel-button left" onClick={scrollLeft}>◀</button>
        <div className="carousel" ref={carouselRef}>
          {data.map((item) => (
            <img key={item.id} src={item.imagen} alt={item.tipo} />
          ))}
        </div>
        <button className="carousel-button right" onClick={scrollRight}>▶</button>
      </div>
    </section>
  );
}

export default HeroSection;
