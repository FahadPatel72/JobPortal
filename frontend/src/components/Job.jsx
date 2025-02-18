import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'



export const Job = ({ job }) => {

    const navigate = useNavigate();
    const jobid = job?._id;

    const daysAgoFunction = (mongodbTime) => {

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    }

    return (
        <div className='p-5 pb-2 rounded-md shadow-xl overflow-y-auto h-[350px] bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className='rounded-full' size="icon"><Bookmark /></Button>
            </div>
            <div className="flex flex-col justify-between h-[80%]">
                <div className="">
                    <div className='lg:flex items-center gap-2 my-2'>
                        <Button className="p-6" variant="outline" size="icon">
                            <Avatar>
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                        </Button>
                        <div>
                            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                            <p className='text-sm text-gray-500'>{job?.location}</p>
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                        <p className='text-sm text-gray-600'>{job?.description}</p>
                    </div>
                </div>

                <div className="">
                    <div className='md:flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                        <Badge className={'text-[#F83002]'} variant="ghost">{job?.jobType}</Badge>
                        <Badge className={'text-[#F72097] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
                    </div>

                    <div className='md:flex items-center mt-4'>
                        <Button onClick={() => navigate(`/description/${jobid}`)} variant="outline">Details</Button>
                        <Button variant="outline" className="bg-[#6A38C2] text-white">Save For Later</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
