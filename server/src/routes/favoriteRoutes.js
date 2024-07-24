const express = require('express');
const favoriteRoutes = express.Router();
const {  handleAddFavorite,
         handleGetUserFavorites,
         handleRemoveFavorite,
      } = require('../handlers/favoriteHandlers');

// Ruta para agregar un favorito
favoriteRoutes.post('/', handleAddFavorite);

// Ruta para obtener favoritos de un usuario
favoriteRoutes.get('/:useremail', handleGetUserFavorites);

// Ruta para eliminar un favorito
favoriteRoutes.delete('/:favoriteId', handleRemoveFavorite);

module.exports = favoriteRoutes;
