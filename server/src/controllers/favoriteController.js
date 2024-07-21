const { Favorite, User, Productos } = require('../db');

const addToFavorites = async (req, res) => {
  console.log("Received Add Favorite Request:", req.body);
  const { user_email, productos_id } = req.body;
  console.log(user_email)
  try {
    const user = await User.findOne({where: {email:user_email}});
    const product = await Productos.findByPk(productos_id);
console.log(user)

    if (!user || !product) {

      return res.status(404).json({ message: 'User or Product not found' });
    }

    const [favorite, created] = await Favorite.findOrCreate({
      where: { user_id:user.id, productos_id },
      defaults: {user_id:user.id, productos_id }
    });

    if (!created) {
      return res.status(400).json({ message: 'Favorite already exists' });
    }

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).json({ message: 'Error creating favorite', error });
  }
};

const getUserFavorites = async (req, res) => {
  const { user_email} = req.params;
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: user_email },
      include: [Productos]
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

const removeFromFavorites = async (req, res) => {
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
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
};
