const { uploadFromUrl } = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      // Subida desde sistema local
      const imageUrl = req.file.path;
      res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    } else if (req.body.imageUrl) {
      // Subida desde URL remota
      const remoteImageUrl = req.body.imageUrl;
      const result = await uploadFromUrl(remoteImageUrl);
      res.status(200).json({ message: 'Image uploaded successfully from URL', imageUrl: result.secure_url });
    } else {
      res.status(400).json({ message: 'No image file or URL provided' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

module.exports = {
  uploadImage,
};

