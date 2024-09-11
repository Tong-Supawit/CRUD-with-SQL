const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        unique : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    role : {
        type : DataTypes.ENUM("admin", "user"),
        allowNull : true,
        defaultValue : "user"
    },
    loginAttempts : {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 0
    },
    isLocked : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    lockedTime : {
        type : DataTypes.DATE,
        allowNull : true,
    }
})

module.exports = User;
