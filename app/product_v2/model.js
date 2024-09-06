const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../../config/sequilize')

const Product = sequelize.define('Product', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
  },
  image_url:{
    type: DataTypes.TEXT,
  }
});

module.exports = Product;