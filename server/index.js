import express from "express";
// import cors from "cors"

import User from './models/User.js';

import checkAuth from "./utils/checkAuth.js";

import {
  registerValidation,
  loginValidation,
  taskCreateValidation,
} from "./validations.js";

import * as UserController from "./controllers/UserController.js";
import * as TaskController from "./controllers/TaskController.js";
import * as KpiController from "./controllers/KpiController.js";

const app = express();

app.use(express.json());

// const corsOptions ={
//   origin:'*', 
//   credentials:true,            
//   optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("send server...");
});

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/task", taskCreateValidation, TaskController.createTask);
app.delete("/task/:id", TaskController.deleteTask);
app.get("/task/:id", TaskController.getTask);
app.get("/task", TaskController.getAllTask);

app.post('/kpi', KpiController.createKpi);
app.get('/kpi', KpiController.getAllKpis);
app.get('/kpi/:id', KpiController.getKpiById);
app.put('/kpi/:id', KpiController.updateKpiById);
app.delete('/kpi/:id', KpiController.deleteKpiById);

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server ok");
});
