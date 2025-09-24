import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createSalary,
  getAllSalaries,
  getSalaryByEmployee,
  updateSalary,
} from "../controllers/salary.controller.js";

const salaryRouter = Router();

salaryRouter.post("/create", auth, createSalary); // Admin only
salaryRouter.get("/get", auth, getAllSalaries); // Admin only
salaryRouter.put("/update/:id", auth, updateSalary); // Admin only
salaryRouter.get("/:employeeId", auth, getSalaryByEmployee); // Employee (self) or Admin

export default salaryRouter;

