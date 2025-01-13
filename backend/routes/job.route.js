import express from "express";
import  { isRecruiter,isAuthenticated, isStudent } from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated,isRecruiter,postJob);
router.route("/get").get(isAuthenticated,isStudent,getAllJobs);
router.route("/getAdminJobs").get(isAuthenticated,isRecruiter,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,isStudent,getJobById);


export default router;





