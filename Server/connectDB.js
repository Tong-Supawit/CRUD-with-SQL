const sequelize = require("./db");

const connectDB = async () => {
    try{
       await sequelize.sync();
       console.log("Connect to DB success...");
    }catch(err){
        console.log("Connect to DB failed!!!", err);
    }   
}

module.exports = connectDB;