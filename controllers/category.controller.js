import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const category = await prisma.Categories.create({
      data: reqBody,
    });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};
