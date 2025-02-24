import express from "express";
import { isRecruiter, isAuthenticated } from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, isRecruiter, registerCompany);
router.route("/getCompany").get(isAuthenticated, isRecruiter, getCompany);
router.route("/getCompany/:id").get(isAuthenticated, isRecruiter, getCompanyById);
router.route("/update/:id").put(isAuthenticated, isRecruiter, singleUpload, updateCompany);


export default router;





