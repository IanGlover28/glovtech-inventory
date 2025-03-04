'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL,
    expiry_date: DataTypes.DATE,
    reorder_level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};