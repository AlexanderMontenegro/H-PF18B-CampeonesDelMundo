const { Favorite, User, Productos } = require('../db');

const addFavorite = async (req, res) => {
  const { user_id, productos_id } = req.body;

  try {
    const user = await User.findByPk(user_id);
    const product = await Productos.findByPk(productos_id);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    const favorite = await Favorite.create({ user_id, productos_id });
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).json({ message: 'Error creating favorite', error });
  }
};

const getUserFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [Productos]
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

const removeFavorite = async (req, res) => {
  const { favoriteId } = req.params;

  try {
    const favorite = await Favorite.findByPk(favoriteId);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await favorite.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Error removing favorite', error });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite,
};
