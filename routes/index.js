import express from "express";

import home from "../controllers/home_controllers.js";

import projects from "./projects.js";

const router = express.Router();

router.get("/", home);
router.use("/projects", projects);

console.log("router loaded");

export default router;
