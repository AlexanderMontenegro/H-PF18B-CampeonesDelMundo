const express = require('express');
const imageRouter = express.Router();
const upload = require('../middlewares/multer');
const { uploadImage } = require('../controllers/imageController');

// Ruta para subir imagen desde sistema local
imageRouter.post('/upload', upload.single('image'), uploadImage);

// Ruta para subir imagen desde URL remota
imageRouter.post('/upload-from-url', uploadImage);

module.exports = imageRouter;

// Endpoints:
// http://localhost:3001/api/images/upload (local)
// http://localhost:3001/api/images/upload-from-url (remota)