const { Router } = require('express');
const favoriteRoutes = Router();
const { addFavorite, getUserFavorites, removeFavorite } = require('../controllers/favoriteController');

favoriteRoutes.post('/', addFavorite); 
favoriteRoutes.get('/:userId', getUserFavorites); 
favoriteRoutes.delete('/:favoriteId', removeFavorite); 

module.exports = favoriteRoutes;
