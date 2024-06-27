import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js"
import messageRoutes from "./Routes/messageRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import connectDB from "./DB/connectToDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true, withCredentials: true }));

// app.get("/", (req, res) => {
//     res.send("hello world")
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
})

// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server running on port ${PORT}`);
// });

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});