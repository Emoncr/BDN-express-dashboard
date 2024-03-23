import { PrismaClient } from "@prisma/client";
import { CloudinaryMultipleFileUpload } from "../utils/FileUpload.js";
import { throwError } from "../utils/helper.js";
const prisma = new PrismaClient();

export const createNews = async (req, res, next) => {
  try {
    const reqBody = req.body;

    reqBody.catID = Number(reqBody.catID);

    const imgUrls = await CloudinaryMultipleFileUpload(req.files.coverimage);

    if (!imgUrls[0])
      return next(throwError(400, "Please upload at least 1 images"));
    reqBody.img1 = imgUrls[0] ? imgUrls[0] : "";
    reqBody.img2 = imgUrls[1] ? imgUrls[1] : "";
    reqBody.img3 = imgUrls[2] ? imgUrls[2] : "";
    reqBody.img4 = imgUrls[3] ? imgUrls[3] : "";

    const news = await prisma.News_list.create({
      data: reqBody,
    });

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
};
