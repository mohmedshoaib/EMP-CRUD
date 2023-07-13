import express from "express";

import { addWork } from "../controller/work-controller.js";

export const work = express.Router();

work.post("/add/work", addWork)