require('dotenv').config();

const Sequelize = require("sequelize");
const User = require("./User");
const Product = require("./Product");
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_ROOT_PASSWORD,
    {
        host: process.env.MYSQL_DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize);
db.product = require("./Product")(sequelize, Sequelize);

db.user.hasMany(db.product, {
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
});

db.product.belongsTo(db.user);

module.exports = db;