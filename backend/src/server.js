// const express  = require('express')
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
import { connectdb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server } from "./lib/socket.js"



const __dirname = path.resolve();

dotenv.config();

const port =process.env.PORT || 3000;

app.use(express.json({limit:"5mb"}))
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))

app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/current",(req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

server.listen(port, () =>{
    console.log(`server is running on port ${port}`)
    connectdb()
})