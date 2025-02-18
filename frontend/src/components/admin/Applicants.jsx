import React, { useEffect } from 'react'
import { Navbar } from '../shared/Navbar'
import { ApplicantsTable } from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import axios from 'axios'

export const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(state => state.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div>
                    <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applicants.length}</h1>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}
