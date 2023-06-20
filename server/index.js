import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import postsRouter from "./routes/posts.router";
import authRouter from "./routes/auth.router";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
