require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("./db");
const User = require("./User");
const connectDB = require("./connectDB");

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();

app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}));
app.use(express.json());
app.use(cookieParser());

//Connect to database.
connectDB();

app.post("/register", async (req, res) => {
    try{
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message : "Please provided all required field."})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password : hashPassword,
        })
        res.status(200).json({message : "Register Success...", user})
    }catch(err){
        console.log("Register Failed!!!")
        res.status(400).json({message : "Register Failed!!!"})
    }
})

app.post("/login", async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({where : {username}});
        if(!user){
            return res.status(401).json({message : "Invalid username"});
        }
        const userValidation = await bcrypt.compare(password, user.password);
        if(!userValidation){
            return res.status(401).json({message : "Invalid password"});
        }
        const token = await jsonwebtoken.sign(
            {id : user.id, role : user.role},
            SECRET_KEY,
            {expiresIn : "1h"}
        )
        res.cookie("token", token, {maxAge : 900000, httpOnly : true, secure : false, sameSite : "lax"})
        res.status(200).json({message : "Login Success..."})
    }catch(err){
        console.log("Login Failed!!!", err)
        res.status(401).json({message : "Login Failed..."})
    }
})

app.post("/logout", (req, res) => {;
    res.clearCookie("token");
    res.status(200).json({message : "Logout success..."})
    console.log("Logout success...")
})

const port = 3000;
app.listen(port, () => console.log("Server Start....."))