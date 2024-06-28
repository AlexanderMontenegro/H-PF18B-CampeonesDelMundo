const axios = require("axios");
const { Categoria } = require("../db");

const getCategorias = async () => {
  try {
    // Obtener datos de la API de productos
    const apiData = (await axios.get("http://localhost:5000/productos")).data;

    const uniqueCategorias = new Set(); // Almacenar categorías únicas

    // Procesar categorías desde la API
    await Promise.all(
      apiData.map(async (producto) => {
        const categorias = producto.categoria.split(", ");
        await Promise.all(
          categorias.map(async (categoria) => {
            const trimmedCategoria = categoria.trim();
            if (!uniqueCategorias.has(trimmedCategoria)) {
              uniqueCategorias.add(trimmedCategoria);
              await Categoria.findOrCreate({ where: { nombre: trimmedCategoria } });
            }
          })
        );
      })
    );

    // Obtener todas las categorías de la base de datos y retornarlas
    const categoriasFromDB = await Categoria.findAll();
    return categoriasFromDB;
  } catch (error) {
    throw new Error(`Error al obtener y procesar las categorías: ${error.message}`);
  }
};

module.exports = {
  getCategorias,
};


