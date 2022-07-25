import React, { useState, useEffect } from 'react'
import { DatePicker, Space } from 'antd';

import { Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom'

import Layout from '../../components/layout'
import PatientLists from './lists';
import Appointments from './appointments';
import { useDispatch, useSelector } from 'react-redux';
import { patientsActions, authActions } from '../../store';

import moment from 'moment';

export default function Admin({ match }) {

    const dispatch = useDispatch();

    const patientDetails = useSelector(x => x.patients.patients);
    const userDetails = useSelector(x => x.auth.user.data.user);

    const [selectedDate, setDate] = useState(moment());


    useEffect(() => {
        getPatients(selectedDate);
    }, [])

    const getPatients = (dateavail) => {
        const b = {
            id: userDetails._id,
            date: `${moment(dateavail).format("DD-MM-YYYY")}`,
        }
        dispatch(patientsActions.getByDate(b))
    }



    const logout = () => {
        dispatch(authActions.logout());
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        getPatients(date);
        setDate(date)
    };

    console.log(patientDetails, 'patientDetails')

    return (
        <div>
            <div className='h-16 bg-white shadow flex items-center w-full'>
                <div className='flex items-center gap-10 justify-center w-full h-full '>
                    <div className='font-bold text-white text-xl bg-primary h-full w-32 flex items-center justify-center'>DM</div>
                    <div className='flex gap-3 items-center justify-center'>
                        <div className='w-10 h-10 rounded-full bg-gray-200'></div>
                        <div className='flex flex-col gap-1'>
                            <div className='text-sm font-bold'>{userDetails.name}</div>
                            <div className='text-xs texxt-gray-400'>{userDetails.email}</div>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center justify-center'>
                        <DatePicker defaultValue={selectedDate} className='border-none rounded' onChange={onChange} />
                    </div>
                    <div className='ml-auto flex gap-6 items-center justify-center px-10'>
                        <Link to={"appointment"}>
                            <button className='text-primary px-8 py-2 font-semibold rounded-full shadow-md shadow-primary/20'>Appointments</button>

                        </Link>
                        <button className='text-primary px-8 py-2 font-semibold rounded-full shadow-md shadow-primary/20'>Walk-in</button>

                        <div className='ml-auto cursor-pointer' onClick={() => logout()}>Logout</div>

                    </div>
                </div>
            </div>
            <div className='h-screen bg-primary/5 p-20 flex flex-col gap-5'>
                <Routes>
                    <Route path="appointment" element={<Appointments />} />
                    <Route path="" element={<PatientLists />} />
                </Routes>
                {/* <PatientLists /> */}

            </div>

        </div>
    )
}
