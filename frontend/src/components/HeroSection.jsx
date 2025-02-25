import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { setSearchQuery } from '../redux/jobSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>"India’s Leading Job Hunt Platform – Empowering You to Land Your Dream Job Faster. Discover Thousands of Opportunities Across Industries and Start Your Career Journey Today!"</p>
                <div className='flex w-[30%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
