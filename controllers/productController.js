const { Product } = require("../models/Index");
const cloudinary = require("../config/cloudinary");


exports.createProduct = async (req, res) => {
 try {
   const { name, description, price, stock, category_id} = req.body;
  
   // Wrap Cloudinary upload_stream in a Promise
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // Upload all images and get URLs
    const imageUrls = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

     await Product.create({
      name,
      description,
      price,
      stock,
      category_id: category_id,
      images:imageUrls
    });

    return res.status(201).json({message:"Product Create Successfully."})

 } catch (error) {
    return res.status(500).json({message:"server error"})
 }

};
