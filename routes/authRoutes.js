import express from "express";

import upload from "../middleware/uploadMiddleware.js";
import {
  editUser,
  getUserInfo,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/edituser/:id", editUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = req.file.path; // Cloudinary URL
  return res.status(200).json({ imageUrl });
});

export default router;
