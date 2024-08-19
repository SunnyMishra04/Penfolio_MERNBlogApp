const authService = require("../ServiceDB/authService");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (username && email && password) {
      const isUser = await authService.findOne({ email: email });

      if (!isUser) {
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        const newUser = {
          username: username,
          password: hashedPassword,
          email: email,
        };
        const savedUser = await authService.insertOne(newUser);
        if (savedUser) {
          return res.status(200).json({ message: "User Registration Successful" });
        }
      } else {
        return res.status(400).json({ message: "Email Already Exists" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const isEmail = await authService.findOne({ email: email });
      if (isEmail) {
        if (await bcryptjs.compare(password, isEmail.password)) {
          const token = jwt.sign({ userID: isEmail._id.toString() }, "MEPHISTO", { expiresIn: "30d" }); 
          return res.status(200).json({ message: "User Login Successful", username: isEmail.username, token });
        } else {
          return res.status(400).json({ message: "Wrong credentials" });
        }
      } else {
        return res.status(400).json({ message: "Email Not Found" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
