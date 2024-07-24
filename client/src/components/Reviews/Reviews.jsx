import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews, addToReviews } from "../../Redux/actions"

// CSS
import "../../css/reviews.css";
import ReviewForm from "./ReviewForm";

const Reviews = ({ productId }) => {

  // console.log("ID DE producto: ", productId);

  // Datos de User y Reviews
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews[productId] || []);
  const dispatch = useDispatch();

  // console.log("EMAIL de User: ", user.email)

  // Efecto para cargar las reviews al montar el componente
  // useEffect(() => {
  //   dispatch(fetchReviews(productId));
  // }, [dispatch, productId]);

  useEffect(() => {
    if (user && user.email) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId, user]);

  console.log("REVIEWS: ", reviews)

  // Función para agregar una nueva review
  const handleAddReview = (comentario, valoracion) => {
    const now = new Date();
    // const fecha = now.toLocaleDateString();

    const newReview = {
      email: user.email,
      product_id: productId,
      comment: comentario,
      rating: valoracion,
      date: now
    }

    dispatch(addToReviews(newReview, productId));
  };

  // console.log("Datos de user: ", user.uid);

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review__list">
          <h4 className="review__title">{review.nombres}</h4>
          <p>{review.comment}</p>
          <span>Valoracion: {review.rating} / 5</span>
        </div>
      ))}

      <ReviewForm handleAddReview={handleAddReview} />
    </div>
  );
};

export default Reviews;
