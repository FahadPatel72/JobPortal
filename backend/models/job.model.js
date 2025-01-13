import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    requirements: [{ type: String }],

    salary: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    experienceLevel: {
        type: Number,
        require: true
    },

    jobType: {
        type: String,
        required: true
    },

    position: {
        type: Number,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applications"
    }],

}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema);

export default Job;
