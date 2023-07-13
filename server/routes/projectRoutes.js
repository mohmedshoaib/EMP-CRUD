import express from "express";

import { addProject, getProjects, getProject, editProject } from '../controller/project-controller.js';

export const project = express.Router();

project.post("/add/newproject", addProject);
project.get("/all/projects", getProjects);
project.get("/one/project/:id", getProject);
project.put("/edit/project/:id", editProject);