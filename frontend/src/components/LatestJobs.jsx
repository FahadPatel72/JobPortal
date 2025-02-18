import React from 'react'
import { LatestJobCards } from './LatestJobCards'
import { useSelector } from 'react-redux';


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

export const LatestJobs = () => {

    const { allJobs } = useSelector(state => state.job);


    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? <span>No Jobs Available</span> : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    )
}
