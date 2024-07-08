const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función para subir imagen desde URL remota
const uploadFromUrl = async (imageUrl) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'products', // Carpeta en Cloudinary
      format: 'jpg', // Formato opcional
    });
    return result;
  } catch (error) {
    throw new Error(`Error uploading image from URL: ${error.message}`);
  }
};

module.exports = {
  cloudinary,
  uploadFromUrl,
};
