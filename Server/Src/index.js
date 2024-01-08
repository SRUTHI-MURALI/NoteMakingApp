import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../Connection/connection.js";
import userRouter from "../Routes/userRouter.js";
import morgan from 'morgan'
const app = express();


dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'))
const corsOption = {
  origin: 'https://note-making-app-rl7z.onrender.com'
};
app.use(cors(corsOption));

connectDB();
const PORT = process.env.port;

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT || 3001);
