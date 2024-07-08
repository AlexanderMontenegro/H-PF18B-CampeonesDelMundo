const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cellphone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
    type: DataTypes.ENUM('user', 'admin'),
    //allowNull: false
    defaultValue: 'user'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    hooks: {
      beforeUpdate: (user, options) => {
        user.updatedAt = new Date();
      }
    }
  });
  return User;

 }


