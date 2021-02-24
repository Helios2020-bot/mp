module.exports = (sequelize, Sequelize) => {
    const order_placed = sequelize.define("order_placed",  {
      orderId:{
          field: 'orderId',
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      dishId:{
        type:Sequelize.INTEGER,
        field: 'dishId',
        references: {
            model: 'dish',
            key: 'dishId'
        }
      },
      restId:{
        type:Sequelize.INTEGER,
        field: 'restId',
        references: {
            model: 'restaurant',
            key: 'restId'
        }
      },
      userId:{
        type:Sequelize.INTEGER(11),
        field: 'userId',
        references: {
            model: 'user',
            key: 'Uid'
        }
      },
      quantity:{
        field: 'quantity',
        type:Sequelize.INTEGER,
     
    }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        underscored: true
    });
  
    return order_placed;
  };