import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'


export const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className='rounded-full' size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://png.pngtree.com/png-vector/20220509/ourmid/pngtree-company-logo-design-trademark-design-creative-logo-png-image_4569380.png" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni architecto sapiente provident nesciunt ullam animi!</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
                <Badge className={'text-[#F83002]'} variant="ghost">Part Time</Badge>
                <Badge className={'text-[#F72097] font-bold'} variant="ghost">24LPA</Badge>
            </div>

            <div className='flex items-center mt-4'>
                <Button variant="outline" className="">Details</Button>
                <Button variant="outline" className="bg-[#6A38C2] text-white">Save For Later</Button>
            </div>
        </div>
    )
}
