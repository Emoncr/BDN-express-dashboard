import express from "express";
import { createCategory } from "../controllers/category.controller.js";

const route = express.Router();


route.post("/create", createCategory);



export default route;
