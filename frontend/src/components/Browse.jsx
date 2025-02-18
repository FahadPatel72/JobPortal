import React, { useEffect } from 'react'
import { Navbar } from './shared/Navbar'
import { Job } from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice'
import { useGetAllJobs } from '../hooks/useGetAllJobs';

// const randomJobs = [1, 2, 3];


export const Browse = () => {

    useGetAllJobs();

    const { allJobs } = useSelector(state => state.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    })
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-5'>
                    {
                        allJobs && allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
