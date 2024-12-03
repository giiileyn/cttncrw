const cloudinary = require('../config/cloudinary').v2;

const uploadCloud = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded.",
    });
  }

  try {
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "products", // The folder in Cloudinary where product images are stored
            public_id: Date.now() + path.extname(file.originalname), // Unique name based on timestamp
            resource_type: "auto", // Automatically detect file type (image, video, etc.)
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(file.buffer);  // Pass the file buffer to Cloudinary
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Attach the Cloudinary URLs and public IDs to the request body
    req.body.productImages = uploadResults.map(result => ({
      url: result.secure_url,
      public_id: result.public_id
    }));

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error uploading product images to Cloudinary:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading product images to Cloudinary",
    });
  }
};

module.exports = uploadCloud;
