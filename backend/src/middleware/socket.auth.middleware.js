import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // extract token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket rejected: No token");
      return next(new Error("Unauthorized - No Token"));
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user
    const user = await User.findById(decoded.UserId).select("-password");
    if (!User) {
      console.log("Socket rejected: User not found");
      return next(new Error("Unauthorized - User not found"));
    }

    // attach to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated: ${user.fullname} ${(user._id)}`);

    next();
  } catch (error) {
    console.log("Socket auth error:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
