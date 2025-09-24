

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageClodinary = async (image) => {
    try {
        if (!image || !image.buffer) {
            throw new Error("Invalid image file");
        }

        return await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "buyit" },
                (error, uploadResult) => {
                    if (error) {
                        return reject(new Error("Cloudinary upload failed: " + error.message));
                    }
                    resolve(uploadResult);
                }
            );

            uploadStream.end(image.buffer);
        });
    } catch (error) {
        throw new Error(error.message || "Image upload failed");
    }
};

export default uploadImageClodinary;
