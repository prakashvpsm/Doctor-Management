import React, { useState, useEffect } from 'react'
import { Calendar, Radio } from 'antd';

import sunriseImg from '../../assets/sunrise.png'
import sunset from '../../assets/sunset.png'
import CreateSlots from './create-slots';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { slotsActions } from '../../store';


export default function Appointments() {


    const dispatch = useDispatch();
    const slotDetails = useSelector(x => x.slots.slots);
    const userDetails = useSelector(x => x.auth.user.data.user);

    const [visible, setVisible] = useState(false);
    const [sunrise, setSunrise] = useState(true);
    const [selectedDate, setDate] = useState(moment())

    useEffect(() => {
        getSlots(selectedDate)
    }, [])

    const getSlots = (dateavail) => {
        const b = {
            id: userDetails._id,
            date: `${moment(dateavail).format("DD-MM-YYYY")}`,
        }
        dispatch(slotsActions.getByDate(b))
    }


    const onChange = (value) => {
        setDate(value);
        getSlots(value);
    };


    const changeSunrise = (id) => {
        setSunrise(id)
        setVisible(true)
    }

    const getMorningSlots = (slots) => {


        if (slots && slots.length > 0) {
            const filteredDates = []
            slots.forEach((d) => {
                var currentHour = moment(d.from, "HH:mm").format("HH");
                if (currentHour >= 9 && currentHour <= 12) {
                    filteredDates.push(d)
                }
            })
            if (filteredDates.length > 0) {
                return filteredDates.sort(function (a, b) {
                    return a.from.localeCompare(b.from);
                });
            } else {
                return filteredDates
            }
        } else {
            return []
        }
    }

    const getEveSlots = (slots) => {
        if (slots && slots.length > 0) {
            const filteredDates = []
            slots.forEach((d) => {
                var currentHour = moment(d.from, "HH:mm").format("HH");
                console.log(currentHour, 'currentHour')
                if (currentHour >= 17 && currentHour <= 21) {
                    filteredDates.push(d)
                }
            })
            if (filteredDates.length > 0) {
                return filteredDates.sort(function (a, b) {
                    return a.from.localeCompare(b.from);
                });
            } else {
                return filteredDates
            }
        } else {
            return []
        }
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className="flex gap-5 items-center">
                <div className='font-bold text-xl'>Appointments</div>
                <div className='w-px h-5 bg-gray-400'></div>
                <div className='flex gap-1 items-center'>
                    <div className='text-sm text-gray-600'><a href='/doctors' >Home</a></div>
                    <div className='text-sm text-gray-600'>{">"} </div>
                    <div className='text-sm text-gray-600'>Appointments</div>
                </div>
                <div className='ml-auto'><a href='/doctors' className='text-primary text-sm uppercase font-semibold'> {"<<"} Back</a></div>

            </div>
            <div className='flex gap-1'>
                <div className='w-2/6'>
                    <div className="w-5/6 bg-white rounded-lg shadow-lg">
                        <Calendar defaultValue={selectedDate} fullscreen={false} value={selectedDate} onChange={onChange} disabledDate={(date) => {
                            if (date.endOf('d').valueOf() < moment()) {
                                return true;
                            }
                            return false;
                        }} />
                    </div>
                </div>
                <div className='w-4/6'>
                    {
                        slotDetails.loading ? <div>...loading</div> : slotDetails.data ? <div className='w-full bg-white p-5 rounded-lg shadow-lg flex flex-col gap-10'>


                            <div className='flex  flex-col gap-10 border-b  pb-10'>
                                <div className='flex'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='bg-primary/10 p-2 rounded-full'>
                                            <img src={sunriseImg} className="w-8 h-7" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='text-xl font-bold'>Morning</div>
                                            <div>9.00 AM to 12.00 PM</div>
                                        </div>
                                    </div>
                                    <div className='ml-auto'>
                                        <button onClick={() => changeSunrise(true)} className='text-sm font-semibold uppercase text-primary'>+ Add slots</button>
                                    </div>
                                </div>
                                <div className='w-full flex'>
                                    {
                                        getMorningSlots(slotDetails.data) && getMorningSlots(slotDetails.data).length > 0 ?
                                            <div className='flex gap-3'>
                                                {
                                                    getMorningSlots(slotDetails.data).map((d, i) => {
                                                        return <div className={`border border-gray-100  p-2 rounded-lg shadow-md ${d.status === 'booked' ? 'bg-primary text-white' : ''}`}>
                                                            <div className='p-1'>{d.textTime} AM</div>
                                                        </div>
                                                    })
                                                }

                                            </div> : <div>
                                                <h6>No slots Available</h6>
                                            </div>
                                    }

                                </div>

                            </div>
                            <div className='flex  flex-col gap-10'>
                                <div className='flex'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='bg-primary/10 p-2 rounded-full'>
                                            <img src={sunset} className="w-8 h-7" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='text-xl font-bold'>Evening</div>
                                            <div>5.00 AM to 9.00 PM(17:00 to 21:00)</div>
                                        </div>
                                    </div>
                                    <div className='ml-auto'>
                                        <button onClick={() => changeSunrise(false)} className='text-sm font-semibold uppercase text-primary'>+ Add slots</button>
                                    </div>
                                </div>
                                <div className='w-full flex'>
                                    {
                                        getEveSlots(slotDetails.data) && getEveSlots(slotDetails.data).length > 0 ?
                                            <div className='flex gap-3'>
                                                {
                                                    getEveSlots(slotDetails.data).map((d, i) => {
                                                        return <div className={`border border-gray-100  p-2 rounded-lg shadow-md ${d.status === 'booked' ? 'bg-primary text-white' : ''}`}>
                                                            <div className='p-1'>{d.textTime} PM</div>
                                                        </div>
                                                    })
                                                }

                                            </div> : <div>
                                                <h6>No slots Available</h6>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div> :
                            <div></div>
                    }

                </div>
            </div>
            <CreateSlots selectedDate={selectedDate} visible={visible} setVisible={setVisible} sunrise={sunrise} />
        </div>
    )
}
