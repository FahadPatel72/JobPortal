import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Popover } from '../ui/popover'
import { PopoverTrigger } from '../ui/popover'
import { PopoverContent } from '../ui/popover'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { Trophy, User2 } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '@/redux/authSlice'


export const Navbar = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = async () => {

        try {
            const response = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (response.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className='bg-white'>
            <div className='flex flex-wrap md:items-center h-full items-start justify-between mx-auto p-3 max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl  font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex flex-wrap items-center justify-end gap-2 md:gap-12 sm:justify-center sm:items-center'>
                    <ul className='flex font-medium items-center my-2 gap-5'>
                        {
                            user && user?.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-4'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullName}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>

                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit border-0 outline-0 items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button className='border-0 bg-white text-black hover:bg-gray-300 focus-visible:outline-0' type='button'><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logOutHandler} className='border-0 bg-white text-black hover:bg-gray-300 focus-visible:outline-0' type='button'>Logout</Button>
                                            </div>

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}
