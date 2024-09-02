require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("./User");
const connectDB = require("./connectDB");
const { json } = require("sequelize");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

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
            return res.status(400).json({message : "Please provided all required field."});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password : hashPassword,
        })
        res.status(200).json({message : "Register success...", user});
    }catch(err){
        console.log("Register Failed!!!");
        res.status(400).json({message : "Register Failed!!!"});
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
        const accessToken = await jsonwebtoken.sign(
            {username : user.username, role : user.role},
            ACCESS_TOKEN_SECRET_KEY,
            {expiresIn : "1h"}
        )
        const refreshToken = await jsonwebtoken.sign(
            {username : user.username, role : user.role},
            REFRESH_TOKEN_SECRET_KEY,
            {expiresIn : "1d"}
        )
        res.cookie("accessToken", accessToken, {maxAge : 900000, httpOnly : true, secure : false, sameSite : "lax"});
        res.cookie("refreshToken", refreshToken, {maxAge : 604800000, httpOnly : true, secure : false, sameSite : "lax"});
        res.status(200).json({message : "Login success...", username : user.username, role : user.role});
    }catch(err){
        console.log("Login Failed!!!", err);
        res.status(401).json({message : "Login Failed..."});
    }
})

app.post("/logout", (req, res) => {;
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({message : "Logout success..."})
    console.log("Logout success...")
})

app.get("/checkAuthenticated", async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if(accessToken){
        try{
            const user = jsonwebtoken.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
            return res.status(200).json({message : "Already login...", isAuthenticated : true, user});
        }catch(err){
            console.log("Invalid access token", err);
        }
    }
    if(!refreshToken){
        return res.status(401).json({message : "Not authenticaed"});
    }
    try {
        const user = jsonwebtoken.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
        const newAccessToken = await jsonwebtoken.sign(
            {username : user.username, role : user.role},
            ACCESS_TOKEN_SECRET_KEY,
            {expiresIn : "1h"}
        )
        const newRefreshToken = await jsonwebtoken.sign(
            {username : user.username, role : user.role},
            REFRESH_TOKEN_SECRET_KEY,
            {expiresIn : "1d"}
        )
        res.cookie("accessToken", newAccessToken, {maxAge : 900000, httpOnly : true, secure : false, sameSite : "lax"});
        res.cookie("refreshToken", newRefreshToken, {maxAge : 604800000, httpOnly : true, secure : false, sameSite : "lax"});
        res.status(200).json({message : "Already login", isAuthenticated : true, user});
    }catch(err){
            console.log(err)
            return res.status(401).json({message : "Not authenticaed"});    
    }
})

app.get("/getDataUser", async(req, res) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({message : "Token not found!!!"})
    }
    try{
        const user = jsonwebtoken.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
        if(user.role === "admin"){
            const dataUser = await User.findAll({
                attributes : ["id", "username", "email", "role"]
            });
        res.status(200).json({message : "Fetch data success...", dataUser});
        }else{
            throw new Error("Unauthorized access");
        }
    }catch(err){
        res.status(401).json({message : "Not authenticated"});
        console.log("Authentication error!!!", err);
    }
})

app.delete("/deleteUser/:id", async(req, res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(404).json({message : "User not found!!!"})
        }
        const userDeleted = await User.destroy({where : {id}})
        if(userDeleted === 0){
            return res.status(404).json({message : "Could not delete user!!!"})
        }
        res.status(200).json({message : "User is deleted..."})
    }catch(err){
        console.log("Failed to delete user!!!", err)
        res.status(500).json({message : "Internal server error!!!"})
    }
})

const port = 3000;
app.listen(port, () => console.log("Server Start....."))