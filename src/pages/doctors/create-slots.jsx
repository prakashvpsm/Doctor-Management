import React, { useState } from 'react'
import Table from '../../components/table'
import { Button, Drawer, Radio, Space, TimePicker } from 'antd';
import {  useDispatch, useSelector } from 'react-redux';

import Select from '../../components/inputs/select'

const options = [
    {
        name: 'Orthopaedics',
        value: 'orthopaedics'
    },
    {
        name: 'General Surgery',
        value: 'generalSurgery'
    },
    {
        name: 'Pulmonology',
        value: 'pulmonology'
    },
    {
        name: 'Cardiology',
        value: 'cardiology'
    }
]

export default function CreateSlots({ visible, setVisible, sunrise }) {

    const [placement, setPlacement] = useState('right');
    const [durationerror, setSurationError] = useState(null);
    const [nexttoTime, setTotIME] = useState(null);
    const [reqb, setReqb] = useState({});

    const userDetails = useSelector(x => x.auth.user.data.user);

    console.log(userDetails, 'userDetails')


    const showDrawer = () => {
        setVisible(true);
    };

    const onChange = (e) => {
        setTotIME(null)
        const a = e;
        const b = e.add(30, 'minutes')

        const fromDate = e.format("DD MM YYYY hh:mm:ss");
        const toDate = b.format("DD MM YYYY hh:mm:ss");
        const fromTime = e.format("LTS");
        const toTime = b.format("LTS");



        if (toTime) {
            const textTime = `${fromTime} - ${toTime}`
            const reqBody = {
                id: '',
                from: fromDate,
                to: toDate,
                textTime: textTime
            }
            setTotIME(toTime)
            setReqb(prev => {
                return reqBody
            })
        }

    };

    const onClose = () => {
        setVisible(false);
    };

    const submit = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        // const formProps = Object.fromEntries(formData);

        if(Object.keys(reqb).length > 0){

        }

    }

    const onSelect = (e) => {
        console.log(e, 'eeeee')
    }

    return (
        <Drawer
            title="Create a New Slot"
            placement={placement}
            width={500}
            onClose={onClose}
            visible={visible}
        >
            <form onSubmit={submit} className="flex flex-col h-full">


                <div className='flex flex-col gap-5'>
                    <div className='flex justify-start flex-col items-start gap-5'>
                        <div className='text-xs font-bold uppercase tet-xs'>Date :</div>
                        <div className='w-5/6'>
                            11 Aug 2022
                        </div>
                    </div>
                    <div className='flex justify-start flex-col items-start gap-5'>
                        <div className='text-xs font-bold uppercase tet-xs'>Choose Time Slot :  </div>
                        <div className='w-5/6'>
                            <TimePicker onChange={onChange} onSelect={onSelect} order={true} format="HH:mm" />
                        </div>
                    </div>
                    {/* <div className='flex justify-start flex-col items-start gap-5'>
                        <div className='text-xs font-bold uppercase tet-xs'>To : </div>
                        <div className='w-5/6'>
                            <TimePicker onChange={onChange} />                        
                        </div>
                    </div> */}
                    {/* <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Confirm Password :</div>
                            <div className='w-5/6'>
                                <input type={"password"} required={true} name="confirmPassword" className='w-full p-2 border rounded' />
                            </div>
                        </div> */}
                    {
                        nexttoTime ? <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>To :</div>
                            <div className='w-5/6'>
                                {nexttoTime}
                            </div>
                        </div> : <></>
                    }

                </div>

                <div className='mt-auto ml-auto flex gap-5'>
                    <button onClick={onClose} className='bg-gray-500 px-4 py-2 text-white rounded'>Cancel</button>

                    <button type='submit' className='bg-primary px-4 py-2 text-white rounded'>Create Slot</button>

                </div>
            </form>

        </Drawer>
    )
}
