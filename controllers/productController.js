const { Product, Category } = require("../models/index.js");
const cloudinary = require("../config/cloudinary");


exports.createProduct = async (req, res) => {
 try {
   const { name, description, price,old_price,sizes, stock, category_id} = req.body;
  
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
      old_price,
      sizes,
      stock,
      category_id: category_id,
      images:imageUrls
    });

    return res.status(201).json({status:201,message:"Product Create Successfully."})

 } catch (error) {
    return res.status(500).json({status:500,message:"server error"})
 }

};


exports.getAllProduct = async (req, res )=>{
  try {
    const products = await Product.findAll({
      include:[
        {
          model:Category,
          attributes:["name"]
        }
      ]
    })
    if(!products){
      return res.status(404).json({status:404, message:"Products not found"})
    }
    return res.status(200).json({status:200, products})
  } catch (error) {
    return res.status(500).json({status:500, message:"Server Error"})
  }
}


exports.getProductById = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findByPk(product_id,{
      include:[
         {
          model: Category,
          attributes: ["name"],
        },
      ]
    });

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    return res.status(200).json({ status: 200, product });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};


exports.deleteById = async (req, res)=>{
  const {product_id }=  req.params;
  try {
     // 1️⃣ Find product by ID
    const product = await Product.findByPk(product_id);
     if (!product) {
      return res.status(404).json({status:404, message: "Product not found" });
    }
     // 2️⃣ Delete images from Cloudinary (if stored in JSONB)
    if (product.images && Array.isArray(product.images)) {
      for (let imageUrl of product.images) {
        // Extract public_id from Cloudinary URL
        const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

       // 3️⃣ Delete product from DB
    await product.destroy();
    return res.status(200).json({ status:200, message: "Product deleted successfully" });

    }
  } catch (error) {
    return res.status(500).json({ status:500, message: "Server error" });
  }
}
