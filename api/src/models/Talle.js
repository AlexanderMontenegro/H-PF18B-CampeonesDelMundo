const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definir el modelo Producto
  const Talle = sequelize.define('talle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    talle: {
      type: DataTypes.STRING,
      allowNull: true,  // Poner true ya que no todos los productos tienen el campo pais
    },
  },
   {
    timestamps: false,
  });

  
};