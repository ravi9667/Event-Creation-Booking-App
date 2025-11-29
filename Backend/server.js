import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const hostName = '127.0.0.1';
const port = 6060;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello i'm making Event Creation & booking App, so this is my backend of it...!!!")
})

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`)
})