const express = require('express');
const router = express.Router();
const { addToFavorites, getUserFavorites, removeFromFavorites } = require('../controllers/favoritecontroller');

// Ruta para agregar un favorito
router.post('/favorites', addToFavorites);

// Ruta para obtener favoritos de un usuario
router.get('/favorites/:userId', getUserFavorites);

// Ruta para eliminar un favorito
router.delete('/favorites/:favoriteId', removeFromFavorites);

module.exports = router;
