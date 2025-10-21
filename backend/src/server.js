// const express  = require('express')
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
const app = express();

const __dirname = path.resolve();

dotenv.config();

const port =process.env.PORT || 3000;


app.use("/api/auth",authRoutes)
app.use("/api/auth",messageRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/current",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(3000, () => console.log("server is running on port 3000"))