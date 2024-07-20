const { addToFavorites, 
        getUserFavorites, 
        removeFromFavorites 
      } = require('../controllers/favoriteController');

const handleAddFavorite = async (req, res) => {
  try {
    await addToFavorites(req, res);
  } catch (error) {
    console.error('Error in handleAddFavorite:', error);
    res.status(500).json({ message: 'Error creating favorite', error: error.message });
  }
};


const handleGetUserFavorites = async (req, res) => {
  try {
    await getUserFavorites(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving favorites', error });
  }
};

const handleRemoveFavorite = async (req, res) => {
  try {
    await removeFromFavorites(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting favorite', error });
  }
};

module.exports = {
  handleAddFavorite,
  handleGetUserFavorites,
  handleRemoveFavorite,
};
