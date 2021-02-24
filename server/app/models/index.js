const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.dish = require("../models/dish.model.js")(sequelize, Sequelize);
db.restaurant = require("../models/restaurant.model.js")(sequelize, Sequelize);
//db.questionarie = require("../models/restaurant.model.js")(sequelize, Sequelize);
//db.descriptiveQuestion = require("../models/descriptiveQuestion.model.js")(sequelize, Sequelize);
db.ratings = require("../models/ratings.model.js")(sequelize, Sequelize);
db.order_placed = require("../models/order_placed.model.js")(sequelize, Sequelize);
//db.scoreBoard = require("../models/scoreBoard.model.js")(sequelize, Sequelize);
//db.state = require("../models/state.model.js")(sequelize, Sequelize);
db.favourite = require("../models/favourite.model.js")(sequelize, Sequelize);
//db.questionType = require("../models/questionType.model.js")(sequelize, Sequelize);
module.exports = db;


