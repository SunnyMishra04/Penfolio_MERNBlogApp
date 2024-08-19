const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const categoryController = require("../controllers/categoryController");
const multer = require('multer');
const checkIsUserAuthenticated = require("../middleware/authMiddleware");
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/upload'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);

// Public routes (no authentication required)
router.get("/get/allBlogs", blogController.getAllBlogs); // Public access to all blogs
router.get("/get/blog/:id", blogController.getSingleBlog); // Public access to single blog

// Protected routes
router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, blogController.addNewBlog);
router.put("/update/blog/:id", upload.single("thumbnail"), checkIsUserAuthenticated, blogController.updateBlog);
router.delete("/delete/blog/:id", checkIsUserAuthenticated, blogController.deleteBlog);

// Category routes (protected)
router.get("/get/categories", checkIsUserAuthenticated, categoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, categoryController.addNewCategory);

module.exports = router;
