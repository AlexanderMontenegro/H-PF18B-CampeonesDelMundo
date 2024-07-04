import React from "react";
//CSS
import "../../css/footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <img
          className="logo_img"
          src="../../../public/img/fondo-logo-futbol_1195-244.png"
        />
        <ul>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Contactanos</h4>
        <ul>
          <li>
            <a href="/contacto">Nosotros</a>
          </li>
          <li>
            <a href="https://github.com/AlexanderMontenegro/H-PF18B-CampeonesDelMundo">Nuestro proyecto</a>
          </li>
          <li>
            <a href="/privacidad">Política de Privacidad</a>
          </li>
        </ul>
        <h4>Redes Sociales</h4>
        <ul className="social-media">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <p>World champions 2024</p>
    </footer>
  );
};
export default Footer;