import React from "react";
//CSS
import "../../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <a href="/homePage ">
          <img
            className="logo_img"
            src="../img/fondo-logo-futbol_1195-244.png"
          />
        </a>
      </div>
      <div className="nosotros">
        <h4>Contactanos</h4>
        <ul>
          <li>
            <a href="/contacto" target="_blank">
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="https://github.com/AlexanderMontenegro/H-PF18B-CampeonesDelMundo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nuestro proyecto
            </a>
          </li>
          <li>
            <a href="/privacidad" target="_blank">
              Política de Privacidad
            </a>
          </li>
        </ul>
      </div>
      <div className="redes">
        <h4>Redes Sociales</h4>
        <ul className="social-media">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="icono__fluid"
                src="../iconos/facebook.png"
                alt=""
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="icono__fluid"
                src="../iconos/x.png"
                alt=""
              />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="icono__fluid"
                src="../iconos/instagram.png"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
      <p className="p" >World champions 2024</p>
    </footer>
  );
};
export default Footer;
