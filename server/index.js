import express, { json } from "express";
import cors from "cors";
// import { urlencoded } from "body-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));

import postsRouter from "./routes/posts.router.js";
import authRouter from "./routes/auth.router.js";

app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
