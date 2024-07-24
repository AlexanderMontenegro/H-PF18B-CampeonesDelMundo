import React, { useState, useEffect } from "react";

const ReviewForm = ({ handleAddReview }) => {
  // State y Effect
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (comentario && valoracion) {
      handleAddReview(comentario, valoracion);
      setComentario(""); // Reinicia el campo comentario
      setValoracion(0); // Reinicia el campo valoracion
    }
  };

  return (
    <form className="review__form" onSubmit={handleSubmit}>

      {/* <input type="text" value={nombre} /> */}

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
        type="submit"
        className="review__button"
      >
        Enviar
      </button>
    </form>
  );
};

export default ReviewForm;
