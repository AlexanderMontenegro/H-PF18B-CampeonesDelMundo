

const { getAllProducts } = require('../controllers/productControllers');

const getProductosHandlers = async (req, res) => {
  try {
    const response = await getAllProducts();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getProductosHandlers };


