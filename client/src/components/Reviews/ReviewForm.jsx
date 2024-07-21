import React, { useState, useEffect } from "react";

const ReviewForm = ({ productId, addToReviews }) => {
  // State y Effect
  const [user, setUser] = useState("");
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(0);


  // Funciones
  
  return (
    <form>
      <label htmlFor="">Nombre: </label>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <label htmlFor="">Comentario: </label>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <label htmlFor="">Valoracion: </label>
      <select
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

      <button  onClick={() => {addToReviews(user,comentario,valoracion)}}>Enviar</button>
    </form>
  );
};

export default ReviewForm;
