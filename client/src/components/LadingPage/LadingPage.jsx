import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/landigpage.css'; 

const LandingPage = () => {
    const navigate = useNavigate();

    const handleEnterToHomePage = () => {
        navigate('/homePage'); 
    }

    return (
        <div className="landing-page">
            <div className="landing-header">
                <h1>Bienvenido a Campeones del Mundo</h1>
                <p>Tu tienda online en artículos deportivos de alta calidad.</p>
            </div>
            <div className="landing-content">
                <button className="enter-button" onClick={handleEnterToHomePage}>
                    <img src="../img/fondo-logo-futbol_1195-244.png" alt="Logo" />
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
