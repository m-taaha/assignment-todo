import dotenv from "dotenv";
import cors from 'cors'
import express from "express";
import {connectDB} from "./config/db.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import cookieParser from "cookie-parser";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true, limit: "16kb" }));
server.use(cookieParser());

server.use(cors());
server.use(errorHandler);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT: http://localhost:${PORT}`,);
})