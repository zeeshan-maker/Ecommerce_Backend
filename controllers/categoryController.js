const { Category } = require("../models/Index");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });

    return res
      .status(201)
      .json({
        status: 201,
        message: "Category created successfully",
        category,
      });
  } catch (error) {
    console.error("Category Creation Error:", error);
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};


exports.getAllCategory = async (req, res) =>{
  try {
    const category = await Category.findAll();
    return res.status(200).json({status:200,category})
  } catch (error) {
    return res.status(500).json({message:"Server Error"})
  }
}
