import express from "express";

import mongoose from "mongoose";

import checkAuth from "./utils/checkAuth.js";

import { registerValidation, loginValidation } from "./validations.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.v7dxkcv.mongodb.net/my-trello?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("send server...");
});

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server ok");
});
