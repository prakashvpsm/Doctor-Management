import React, { useState, useEffect } from 'react'
import Table from '../../components/table'
import { Button, Drawer, Radio, Space, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { slotsActions } from '../../store';


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

const defaultDisabledHours = [1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 22, 23]

const morning = [9, 10, 11, 12]
const evening = [17, 18, 19, 20, 21]


export default function CreateSlots({ visible, setVisible, sunrise, selectedDate }) {

    const [placement, setPlacement] = useState('right');
    const [durationerror, setSurationError] = useState(null);
    const [disabledHours, setdisabledHours] = useState([]);
    const [nexttoTime, setTotIME] = useState(null);
    const [error, setError] = useState(null);

    const [reqb, setReqb] = useState({});

    const dispatch = useDispatch();

    const slotDetails = useSelector(x => x.slots.slots);
    const userDetails = useSelector(x => x.auth.user.data.user);


    console.log(slotDetails, 'slotDetails')

    useEffect(() => {

        if (sunrise === true) {
            setdisabledHours([...defaultDisabledHours, ...evening])
        } else if (sunrise === false) {
            setdisabledHours([...defaultDisabledHours, ...morning])
        }

    }, [sunrise])

    useEffect(() => {

    }, [])


    const showDrawer = () => {
        setVisible(true);
    };

    const onChange = (e) => {
        var currentHour = moment(e, "HH:mm").format("HHmm");
        var currentHourWithoutM = moment(e, "HH:mm").format("HH");

        setError(null);

        const existingHoursDetails = slotDetails.data ? slotDetails.data.length > 0 ? slotDetails.data : [] : [];

        const existingHours = existingHoursDetails.map(d => {
            const fromT = moment(d.from, "HH:mm").format("HHmm");
            const toT = moment(d.to, "HH:mm").format("HHmm");
            console.log(currentHour, fromT, toT)
            if (fromT < currentHour && toT > currentHour) {
                return true
            }
        }).filter(d => d != undefined)

        if (existingHours.length > 0) {
            setError('Time Slot Already Exists or this duration might overlap existing time slot. Select Different time slot')
        } else {
            if (sunrise === true) {

                if (currentHourWithoutM >= 9 && currentHourWithoutM < 12) {
                    setTime(e)
                } else {
                    setError('Select Any time between 09 AM to 12 AM')
                }

            } else {
                if (currentHourWithoutM >= 17 && currentHourWithoutM < 21) {
                    setTime(e)
                } else {
                    setError('Select Any time between 17 and 21 (05 PM to 09PM)')
                }
            }
        }

    };

    const setTime = (e) => {
        setTotIME(null)

        const fromTime = e.format("HH:mm");

        const toTime = e.add(30, 'minutes').format("HH:mm");

        // console.log(slotDetails, 'slot')

        if (toTime) {
            const textTime = `${fromTime} - ${toTime}`
            const reqBody = {
                id: userDetails._id,
                slotDate: `${moment(selectedDate).format("DD-MM-YYYY")}`,
                from: fromTime,
                to: toTime,
                textTime: textTime
            }
            setTotIME(toTime)
            setReqb(prev => {
                return reqBody
            })
        }
    }

    const onClose = () => {
        setVisible(false);
    };

    const submit = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        // const formProps = Object.fromEntries(formData);
        if (Object.keys(reqb).length > 0 && reqb.id && reqb.slotDate && reqb.from && reqb.to && reqb.textTime) {
            dispatch(slotsActions.create(reqb));
            setError(null);
            setTotIME(null);
            setReqb({});
            setTimeout(() => {
                window.location.reload()
            }, 1000);

        } else {
            setError('Fill all the fields');
        }
    }

    const onSelect = (e) => {
        console.log(e, 'eeeee')
    }


    console.log(disabledHours, 'dis')

    return (
        <Drawer
            title={sunrise ? "Create Morning Slot" : "Create Evening Slot"}
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

                            {
                                moment(selectedDate).format("DD/MM/YYYY")
                            }
                        </div>
                    </div>
                    <div className='flex justify-start flex-col items-start gap-5'>
                        <div className='text-xs font-bold uppercase tet-xs'>Choose Time Slot :  </div>
                        <div className='w-5/6'>
                            <TimePicker onChange={onChange} onSelect={onSelect} order={true} format="HH:mm" />
                        </div>
                    </div>
                    <div>

                    </div>

                    {
                        nexttoTime ? <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>To :</div>
                            <div className='w-5/6'>
                                {nexttoTime}
                            </div>
                        </div> : <></>
                    }

                </div>
                {
                    error ? <div className='py-10 text-red-600'>
                        {error}
                    </div> : <></>
                }

                <div className='mt-auto ml-auto flex gap-5'>
                    <button onClick={onClose} className='bg-gray-500 px-4 py-2 text-white rounded'>Cancel</button>

                    <button type='submit' className='bg-primary px-4 py-2 text-white rounded'>Create Slot</button>

                </div>
            </form>

        </Drawer>
    )
}
