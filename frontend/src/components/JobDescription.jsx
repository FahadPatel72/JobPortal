import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../utils/constant';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';


export const JobDescription = () => {

    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(state => state.job);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const isInitiallyApplied = singleJob?.applicants?.some(applications => applications.applicant === user?.id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                setIsApplied(true); //Update the local state
                const updateSingleJobs = { ...singleJob, applicants: [...singleJob.applicants, { applicant: user?.id }] }
                dispatch(setSingleJob(updateSingleJobs));   //help us to update in real time
                toast.success(res.data.messsage);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messsage);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applicants.some(applications => applications.applicant === user?.id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002]'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#F72097] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied ? 'Already applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='p-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='p-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='p-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='p-4 font-normal text-gray-800'>{singleJob?.experienceLevel}years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='p-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='p-4 font-normal text-gray-800'>{singleJob?.applicants.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='p-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}
