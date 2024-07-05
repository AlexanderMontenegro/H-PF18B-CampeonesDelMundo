const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../config/cloudinary")

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.cloudinary,
  params: {
    folder: 'products', // carpeta en Cloudinary donde se almacenan los archivos.
    format: async (req, file) => 'jpg', // Opcional: formato de imagen
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;



