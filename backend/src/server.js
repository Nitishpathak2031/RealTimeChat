// const express  = require('express')
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
const app = express();



dotenv.config();

const port =process.env.PORT || 3000;


app.use("/api/auth",authRoutes)
app.use("/api/auth",messageRoutes)
app.listen(3000, () => console.log("server is running on port 3000"))