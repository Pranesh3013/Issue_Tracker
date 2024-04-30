import express from "express";

const app = express.Router();

import {
  createProject,
  projectDetails,
  createIssue,
} from "../controllers/Project_controllers.js";

app.post("/create", createProject);
app.get("/:id", projectDetails);
app.post("/:id", createIssue);

console.log("project router loaded");

export default app;
