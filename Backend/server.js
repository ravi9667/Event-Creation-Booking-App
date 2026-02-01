import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventsRoutes from './routes/eventRoutes.js';

dotenv.config()
const app = express();

const hostName = '0.0.0.0';
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use("/uploads", express.static("uploads"))

app.get("/", (req, res) => {
    res.send("Hello i'm making Event Creation & booking App, so this is my backend of it...!!!")
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventsRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected Successfully");

    app.listen(port, hostName, () => {
        console.log(`Server is running on http://${hostName}:${port}`)
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // app crash so Render can restart
  }
};

startServer();
