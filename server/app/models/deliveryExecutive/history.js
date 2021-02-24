

const { DataTypes } = require('sequelize');
const sequelize = require('./dbconfig');

const History = sequelize.define('History', {
  // Model attributes are defined here
  deliveryUserID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER
  },
  userName: {
    type: DataTypes.STRING
  },
  userAddress: {
    type: DataTypes.STRING,
  },
  restName: {
    type: DataTypes.STRING
  },
  restAddress: {
    type: DataTypes.STRING
  }
}, {
});

module.exports = History;