import express from "express";
import cookieParser from "cookie-parser";
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import hotelsRoute from "./routes/hotels.js"
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

// import { connect }  from "./config/database"
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//connect DB
const connect = () => {
  mongoose
    .connect(
      process.env.MONGO_URL
    )
    .then((result) => console.log("Connected to mongoDB."))
    .catch((err) => console.log(err));
};

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.json())


app.use ("/api/auth",authRoute)
app.use ("/api/users",usersRoute)
app.use ("/api/rooms",roomsRoute)
app.use ("/api/hotels",hotelsRoute)


app.use(express.static(path.join(__dirname, "/client/build")));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not Found" });
});
app.listen(process.env.PORT||8000, () => {
  connect();

});
