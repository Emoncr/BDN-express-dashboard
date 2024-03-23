import express from "express";
import { createNews } from "../controllers/news.controller.js";
import { uploadFiles } from "../utils/FileUpload.js";

const route = express.Router();

const imgfields = [
  { name: "coverimage", maxCount: 4 },
];

route.post("/create", uploadFiles.fields(imgfields), createNews);


export default route;
