const { Review, User } = require('../db');

// Crear una nueva reseña
const createReview = async (req, res) => {
  try {
    const { email, product_id, rating, comment, date } = req.body;

    // Validaciones básicas
    if (!email || !product_id || !rating) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    console.log("EMAIL desde back: ", email)
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email: email } });
    // const product = await Productos.findByPk(product_id);
    console.log("Desde back, user: ",  user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear la reseña
    const newReview = await Review.create({
      user_id: user.id,
      nombres: user.name,
      product_id: product_id,
      rating: rating,
      comment: comment,
      date: date
    });

    res.status(201).json(newReview);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reseña' });
  }
};

// Obtener reseñas de un producto
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params; // Captura el parámetro correctamente
    console.log("DE GET: ", productId);
    const reviews = await Review.findAll({ where: { product_id: productId } }); // Usa el nombre correcto de la columna
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
};

// Obtener reseñas de un usuario
const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.findAll({ where: { user_id: userId } });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
};

// Actualizar una reseña
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const [updated] = await Review.update({ rating, comment }, { where: { id: reviewId } });

    if (updated) {
      const updatedReview = await Review.findOne({ where: { id: reviewId } });
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: 'Reseña no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la reseña' });
  }
};

// Eliminar una reseña
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deleted = await Review.destroy({ where: { id: reviewId } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Reseña no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reseña' });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
};

