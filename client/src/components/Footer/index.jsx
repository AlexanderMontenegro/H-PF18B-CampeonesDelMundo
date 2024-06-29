import React from "react";
import '../../css/footer.css';



export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h4>Logo</h4>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/tienda">Productos</a></li>
          <li><a href="/otros">carrito</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Contactanos</h4>
        <ul>
          <li><a href="/contacto">Nosotros</a></li>
          <li><a href="/contacto">Nuestro proyecto</a></li>
          <li><a href="/privacidad">Política de Privacidad</a></li>
        </ul>
        <h4>Redes Sociales</h4>
        <ul className="social-media">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
      <p>World champions 2024</p>
    </footer>
  );
};
export default Footer;