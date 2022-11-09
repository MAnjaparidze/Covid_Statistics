import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";

import { mongooseClient } from "./config/dbConfig";
import { task } from "./utils/updateStats";

const app: Application = express();

mongooseClient;

task.start();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server Running on Port ${port}`));