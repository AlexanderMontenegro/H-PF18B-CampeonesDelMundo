import React, { useState, useEffect } from "react";

// CSS
import "../../css/reviews.css";
import ReviewForm from "./ReviewForm";

const Reviews = ({ productId }) => {
  // State y Effect
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const comentarios = [
      {
        user: "Richard Pereira",
        comentario: "Es un estupendo producto",
        valoracion: 5,
      },
      {
        user: "Ruben Mela Dobla",
        comentario: "Me gusta su color y material, precioso",
        valoracion: 4,
      },
      {
        user: "Esteban Quito",
        comentario: "Es pesimo, se ensucia mucho y causa irritaciones",
        valoracion: 1,
      },
    ];

    setReviews(comentarios);
  }, []);

  // funciones - REVIEWS
  const addToReviews = (user, comentario, valoracion) => {
    // Nuevo review
    const nuevoReview = {
      user,
      comentario,
      valoracion,
    };

    // Agregar a Reviews
    setReviews([...reviews, nuevoReview]);
  };

  return (
    <div className="review__list">
      {reviews.map((review, index) => (
        <div key={index}>
          <h4>{review.user}</h4>
          <p>{review.comentario}</p>
          <span>Valoracion: {review.valoracion} / 5</span>
        </div>
      ))}

      <ReviewForm productId={productId} addToReviews={addToReviews} />
    </div>
  );
};

export default Reviews;
