
import React from 'react';
import "../../css/nosotros.css"
import Footer from '../Footer/Footer';
import Header from "../Header/Header"

function Nosotros() {
  const integrantes = [
    {
      nombre: 'Alexander Montenegro-',
      email: 'Alexandermontenegro0691@gmail.com',
      linkedin: 'https://www.linkedin.com/in/alexander-montenegro/',
      github: 'https://www.github.com/AlexanderMontenegro',
      foto: 'https://avatars.githubusercontent.com/u/146051902?v=4',
    },
    {
      nombre: 'Lucas Tagliapietra-',
      email: 'lucastagliapietra@hotmail.com',
      linkedin: 'Falta',
      github: 'https://github.com/lucastagliapietra19',
      foto: 'https://avatars.githubusercontent.com/u/118776762?v=4',
    },
    {
        nombre: 'Joshua Avalo-',
        email: 'avalojoshua83@gmail.com',
        linkedin: 'Falta',
        github: 'https://github.com/joshuaavalo',
        foto: 'https://avatars.githubusercontent.com/u/106624318?v=4',
    },
    {
        nombre: 'Richard Pereira-',
        email: 'richrdpere123@gmail.com',
        linkedin: 'Falta',
        github: 'https://github.com/richrdPere',
        foto: 'https://avatars.githubusercontent.com/u/162060136?v=4',
    },
    {
        nombre: 'Santiago Palacio-',
        email: 'spa497@gmail.com',
        linkedin: 'Falta',
        github: 'https://github.com/SPalacioAhun',
        foto: 'https://avatars.githubusercontent.com/u/123433608?v=4',
    },
    {
        nombre: 'Erik Neuman Erik Neuman-',
        email: 'neuman10327033@gmail.com',
        linkedin: 'Falta',
        github: 'https://github.com/NeumanGallardo',
        foto: 'https://avatars.githubusercontent.com/u/140033217?v=4',
      },
   
  ];

  return (
<div>
  {/*
<div>
<Header/>
</div>
*/}
     

    <div className="container__ns">
      {integrantes.map((integrante, index) => (
        <div key={index} className="card">
          <img src={integrante.foto} alt={`Foto de perfil de ${integrante.nombre}`} />
          <div className="card-content">
            <h3>{integrante.nombre}</h3>
            <p>Email: {integrante.email}</p>
            <div className="social-links">
              <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="github">GitHub</a>
            </div>
          </div>
        </div>
      ))}
    </div>
<div>

<Footer/>

</div>
    </div>

  );

}

export default Nosotros;
