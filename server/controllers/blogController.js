
const blogService = require("../ServiceDB/blogService");
const categoryService = require("../ServiceDB/categoryService");



const getAllBlogs = async (req, res) => {
  try {
    const fetchAllBlogs = await blogService.find();
    
    // Populate category titles
    const blogsWithCategories = await Promise.all(fetchAllBlogs.map(async (blog) => {
      const category = await categoryService.findById(blog.category);
      blog.categoryTitle = category ? category.title : "Unknown Category"; // add categoryTitle to blog
      return blog;
    }));

    res.status(200).json(blogsWithCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const addNewBlog = async (req, res) => {
  const { title, category, description } = req.body;
  try {
    if (title && category && description) {
      const addBlog = {
        title: title,
        description: description,
        category: category,
        thumbnail: req.file ? req.file.filename : null, 
        user: req.user._id,
      };
      const savedBlog = await blogService.insertOne(addBlog);
      if (savedBlog.insertedId) {
        return res.status(201).json({ message: "Blog added successfully" });
      } else {
        return res.status(400).json({ message: "Failed to add blog" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const fetchBlogByID = await blogService.findById(id);
      if (fetchBlogByID) {
        const category = await categoryService.findById(fetchBlogByID.category);
        fetchBlogByID.categoryTitle = category ? category.title : "Unknown Category"; // 
        return res.status(200).json(fetchBlogByID);
      } else {
        return res.status(404).json({ message: "Blog not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid URL" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};





const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, category, description } = req.body;

  try {
    if (title && category && description) {
      const updateData = {
        title: title,
        description: description,
        category: category,
      };

      
      if (req.file) {
        updateData.thumbnail = req.file.filename;
      }

      const updatedBlog = await blogService.updateOne(id, { $set: updateData });

      if (updatedBlog.matchedCount > 0) {
        return res.status(200).json({ message: "Blog updated successfully" });
      } else {
        return res.status(404).json({ message: "Blog not found" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await blogService.deleteOne(id);

    if (deletedBlog.deletedCount > 0) {
      return res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllBlogs, addNewBlog, getSingleBlog, updateBlog, deleteBlog };
