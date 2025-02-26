import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {

    try {
        const userId = req.user.id;

        const { id: jobId } = req.params;

        if (!jobId) {
            return res.status(404).json({
                success: false,
                message: "Job Id is required"
            })
        }

        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "Yoou have already applied for this job",
                success: false,
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job.applicants.push(newApplication._id);

        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}

//user side
export const getAppliedJob = async (req, res) => {

    try {
       const userId = req.user.id;

       const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}},
        }
    });

    if(!application){
        return res.status(400).json({
            success: false,
            message: "No applications",
        })
    }

    return res.status(200).json({
        application,
        success:true,
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}


//admin dekhega kitne users ne apply kiya hai
export const getApplicants = async (req,res)=>{

    try{
      const jobId = req.params.id.trim();

      const job = await Job.findById(jobId).populate({ path:'applicants', options:{sort:{createdAt:-1}},populate:{ path:'applicant' } });

      if(!job){
        return res.status(404).json({
            success: false,
            message: "Job not found",
        })
      }

      return res.status(200).json({
        success:true,
        job,
      })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }

}

export const updateStatus = async (req,res)=>{
    try{
      const {status} = req.body;

      const applicantionId = req.params.id.trim();

      if(!status){
        return res.status(404).json({
            message:"Status is required",
            success:false,
        })
      }

      //find the application by application id
      const application = await Application.findOne({
        _id:applicantionId
      })

      if(!application){
        return res.status(404).json({
            message: "Application not found",
            success: false,
        })
      }

      //update the status 
      application.status = status.toLowerCase();

      await application.save();

      return res.status(200).json({
        message:"Status updated successfully",
        success:true,
      })
         
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}