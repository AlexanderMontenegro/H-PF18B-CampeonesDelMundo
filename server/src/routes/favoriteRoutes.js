const express = require('express');
const router = express.Router();
const { addFavorite, getUserFavorites, removeFavorite } = require('../controllers/favoriteController');


router.post('/favorites', addFavorite);


router.get('/favorites/:userId', getUserFavorites);


router.delete('/favorites/:favoriteId', removeFavorite);

module.exports = router;
