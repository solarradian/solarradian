// routes/project.routes.js
import express from "express";
import {
 createProject, getAllProjects  , updateProject , deleteProject } from "../controllers/project.controller.js";
import auth from "../middleware/auth.js";


const projectRouter = express.Router();


projectRouter.post("/createproject", auth, createProject);

projectRouter.get("/getallprojects", auth, getAllProjects);

projectRouter.put("/:id", updateProject);


projectRouter.delete("/:id", deleteProject);

export default projectRouter;
