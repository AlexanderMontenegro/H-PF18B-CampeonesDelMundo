const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productos_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'favorites',
    timestamps: false,
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Favorite.belongsTo(models.Productos, { foreignKey: 'productos_id', as: 'producto' });
  };

  return Favorite;
};


