import express from "express";  

import checkAuth from "./utils/checkAuth.js";

import { registerValidation, loginValidation } from "./validations.js";

import * as UserController from "./controllers/UserController.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
