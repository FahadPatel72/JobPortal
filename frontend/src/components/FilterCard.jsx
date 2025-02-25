import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: [
            { value: "Delhi NCR", label: "Delhi NCR" },
            { value: "Bangalore", label: "Bangalore" },
            { value: "Hyderabad", label: "Hyderabad" },
            { value: "Pune", label: "Pune" },
            { value: "Mumbai", label: "Mumbai" },
        ]
    },
    {
        filterType: "Industry",
        array: [
            { value: "Frontend Developer", label: "Frontend Developer" },
            { value: "Backend Developer", label: "Backend Developer" },
            { value: "Full Stack Developer", label: "Full Stack Developer" },
        ]
    },
    {
        filterType: "Salary",
        array: [
            { value: "1---10", label: "0-40k" },
            { value: "10---20", label: "42k-1lakh" },
            { value: "20---50", label: "1lakh to 5lakh" },
        ]
    },
]

export const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        console.log(value);
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler} >
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item.value} id={itemId} />
                                            <label htmlFor={itemId}>{item.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}
