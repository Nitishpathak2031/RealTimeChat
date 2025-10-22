// const express  = require('express')
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
import { connectdb } from "./lib/db.js"
const app = express();

const __dirname = path.resolve();

dotenv.config();

const port =process.env.PORT || 3000;

app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/auth",messageRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/current",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
    connectdb()
})