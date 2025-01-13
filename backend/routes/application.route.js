import express from "express";
import  { isRecruiter,isAuthenticated, isStudent } from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controllers/application.controller.js";



const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,isStudent,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated,isRecruiter,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,isRecruiter,updateStatus);


export default router;





