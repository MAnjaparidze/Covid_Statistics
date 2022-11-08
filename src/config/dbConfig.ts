import mongoose from "mongoose";
import { populateDB } from "../utils/populateDB";

mongoose
.connect(process.env.MONGO_DB_URI || "mongodb://localhost:27017/covid_statistics")
.then(() => console.log("Connected to MongoDB..."))
.then(() => populateDB())
.catch((err) => console.error('Could not connect to MongoDB...', err));

export {
  mongoose as mongooseClient
}