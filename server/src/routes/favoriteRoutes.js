const { Router } = require('express');
const favoriteRoutes = Router();
const { handleAddFavorite, handleGetUserFavorites, handleRemoveFavorite } = require('../handlers/favoriteHandlers');

favoriteRoutes.post('/', handleAddFavorite); 
favoriteRoutes.get('/:userId', handleGetUserFavorites); 
favoriteRoutes.delete('/:favoriteId', handleRemoveFavorite); 

module.exports = favoriteRoutes;
