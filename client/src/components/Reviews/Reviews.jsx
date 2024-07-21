import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// CSS
import "../../css/reviews.css";
import ReviewForm from "./ReviewForm";

const initialReviews = [
  {
    
    nombre: "Richard Pereira",
    comment: "Es un estupendo producto",
    rating: 5,
  },
  {
    nombre: "Ruben Mela Dobla",
    comment: "Me gusta su color y material, precioso",
    rating: 4,
  },
  {
    nombre: "Esteban Quito",
    comment: "Es pesimo, se ensucia mucho y causa irritaciones",
    rating: 1,
  },
];

const Reviews = ({ productId }) => {

  // Datos de User
  const user = useSelector((state) => state.user);

  // console.log("PROPS DE user en reviews: ", user)
  // console.log("PROPS DE user en reviews: ", user.accessToken)
  console.log("PROPS DE user en reviews: ", user.name)

  // State y Effect
  const [reviews, setReviews] = useState(initialReviews);

  // useEffect(() => {
  //   const comentarios = 

  //   setReviews(comentarios);
  // }, []);

  // funciones - REVIEWS
  const addToReviews = (productId, rating, comment) => {

    // fecha
    const fecha = now.toLocaleDateString();
    const nombre = user.name;
    // Nuevo review
    const nuevoReview = {
      nombre,
      productId,
      rating,
      comment,
      fecha
    };

    // Agregar a Reviews
    setReviews([...reviews, nuevoReview]);
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review__list">
          <h4 className="review__title">{review.nombre}</h4>
          <p>{review.comment}</p>
          <span>Valoracion: {review.rating} / 5</span>
        </div>
      ))}

      <ReviewForm productId={productId} addToReviews={addToReviews} />
    </div>
  );
};

export default Reviews;
