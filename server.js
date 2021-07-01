import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from './routes/subscribers.js';
const app = express();
dotenv.config(); 
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected");
});
app.use(express.json());
app.use('/subscribers', router)
app.listen(3000, () => {
  console.log("server start");
});
