import { PrismaClient } from "@prisma/client";
import {
  CloudinaryMultipleFileUpload,
  uploadToCloudinary,
} from "../utils/helper.js";

const prisma = new PrismaClient();

export const createNews = async (req, res, next) => {
  try {
    console.log(req.files);
    //   const imgurl = await uploadToCloudinary(req.file);

    const imgUrls = await CloudinaryMultipleFileUpload(req.files.coverimage);
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};
