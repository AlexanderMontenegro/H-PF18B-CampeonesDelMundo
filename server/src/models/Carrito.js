const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Carrito', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
