import Job from "../models/job.model.js";


//recruiter
export const postJob = async (req, res) => {

    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;

        const userId = req.user.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }

        const job = await Job.create({
            title, description, salary, location, requirements, jobType, experienceLevel, position, company: companyId, createdBy: userId,
        })

        return res.status(201).json({
            success: true,
            job,
            message: "New Job Created Successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//student
export const getAllJobs = async (req, res) => {

    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            })
        }

        return res.status(200).json({
            jobs,
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//students
export const getJobById = async (req, res) => {

    try {
        const jobId = req.params.id.trim();

        const job = await Job.findById(jobId).populate({
            path: "applicants"
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            })
        }

        return res.status(200).json({
            success: true,
            job,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


//admin kitne jobs create kiya ab tak
export const getAdminJobs = async (req, res) => {

    try {
        const adminId = req.user.id;

        const jobs = await Job.find({ createdBy: adminId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            })
        }

        return res.status(200).json({
            jobs,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }

}