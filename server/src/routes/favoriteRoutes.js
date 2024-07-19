const express = require('express');
const router = express.Router();
const { addFavorite, getUserFavorites, removeFavorite } = require('../controllers/favoritecontroller');

// Ruta para agregar un favorito
router.post('/favorites', addFavorite);

// Ruta para obtener favoritos de un usuario
router.get('/favorites/:userId', getUserFavorites);

// Ruta para eliminar un favorito
router.delete('/favorites/:favoriteId', removeFavorite);

module.exports = router;
