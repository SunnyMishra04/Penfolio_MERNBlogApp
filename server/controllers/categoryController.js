const categoryService = require("../ServiceDB/categoryService");

const getAllCategories = async (req, res) => {
  try {
    const fetchAllCategories = await categoryService.find({});
    return res.status(200).json(fetchAllCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addNewCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (title) {
      const newCategory = { title: title }; 
      const savedCategory = await categoryService.insertOne(newCategory);
      if (savedCategory.acknowledged) {
        return res.status(201).json({ message: "Category added successfully" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCategories, addNewCategory };
