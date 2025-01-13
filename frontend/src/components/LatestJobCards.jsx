import React from 'react'
import { Badge } from './ui/badge'

export const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
                <Badge className={'text-[#F83002]'} variant="ghost">Part Time</Badge>
                <Badge className={'text-[#F72097] font-bold'} variant="ghost">24LPA</Badge>
            </div>
        </div>
    )
}
