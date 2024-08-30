const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("register_login", "root", "", {
    host : "localhost",
    dialect : "mysql"
})

module.exports = sequelize;