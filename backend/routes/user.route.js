import express from "express";
import { registerUser, login, updateProfile, logout } from '../controllers/user.controller.js';
import {isAuthenticated} from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,registerUser);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated,updateProfile);
router.route("/logout").post(logout);


export default router;





