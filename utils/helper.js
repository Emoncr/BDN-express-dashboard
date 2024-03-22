import fs from "fs/promises";
import cloudinary from "./cloudinaryConfig.js";

// Delete File Function
export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
}

// Cloudinay File Upload Function
export async function uploadToCloudinary(file) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file.path, {
      public_id: `${Date.now()}-${file.originalname}`,
    });
    return uploadResponse.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    await deleteFile(file.path);
    throw error; // Re-throw to indicate upload failure
  } finally {
    await fs
      .unlink(file.path)
      .catch((err) => console.error("Error deleting local file:", err));
  }
}


// Cloudinay Files Upload Function
export const CloudinaryMultipleFileUpload = async (files) => {
  if (!files || files.length === 0 || !Array.isArray(files)) {

    throw new Error("No files provided for upload");
  }

  const imgUrls = [];
  for (const file of files) {
    const url = await uploadToCloudinary(file); // Call the uploadToCloudinary function
    imgUrls.push(url);
  }
  return imgUrls;
};
