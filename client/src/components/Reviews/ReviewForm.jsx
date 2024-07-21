import React, { useState, useEffect } from "react";

// CSS
// import "../../css/reviews.css"

const ReviewForm = ({ productId, addToReviews }) => {

  // State y Effect
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(0);


  // Funciones
  
  return (
    <form className="review__form">
      {/* <label htmlFor="" >Username: </label>
      <input
        type="text"
        className="review__input"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      /> */}

      <label htmlFor="">Comentario: </label>
      <textarea
        className="review__textarea"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        rows={4}
      />

      <label htmlFor="">Valoracion: </label>
      <select 
        className="review__select"
        value={valoracion}
        onChange={(e) => setValoracion(Number(e.target.value))}
        required
      >
        <option value="">Selecciona una calificacion</option>
        {[1, 2, 3, 4, 5].map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>

      <button  
        className="review__button"
        onClick={() => {addToReviews(productId,comentario,valoracion)}}>Enviar</button>
    </form>
  );
};

export default ReviewForm;
