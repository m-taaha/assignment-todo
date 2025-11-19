import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db.ts";


dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on PORT: http://localhost:${PORT}`,);
    connectDB();
})