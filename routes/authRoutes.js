const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  editUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/edituser/:id", editUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // This is the Cloudinary-hosted URL
  const imageUrl = req.file.path;

  return res.status(200).json({ imageUrl });
});

module.exports = router;
