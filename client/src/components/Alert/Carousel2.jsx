import React, { useState } from 'react';
import { useEffect } from 'react';
import '../../css/carousel2.css'; 

const Carousel = () => {
    const images = [
        "/img/banner1.png",
        "/img/banner2.png",
        "/img/banner3.png",
        "/img/banner4.png"
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); 

        return () => clearInterval(interval); 
    }, [images.length]);

    return (
        <div className="carousel-container">
            <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
        </div>
    );
};

export default Carousel;
