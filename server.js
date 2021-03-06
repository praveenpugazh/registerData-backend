import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dataRoute from "./routes/dataRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => res.send("API is running"));

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connection to MongoDB successful")
);

app.use("/data", dataRoute);

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
