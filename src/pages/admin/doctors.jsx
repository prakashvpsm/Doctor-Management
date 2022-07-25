import React, { useState, useEffect } from 'react'
import Table from '../../components/table'
import { Button, Drawer, Radio, Space } from 'antd';
import { userActions } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import Select from '../../components/inputs/select'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
    }
];



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

export default function Doctors() {

    const dispatch = useDispatch();
    const userDetails = useSelector(x => x.users.users)

    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const [placement, setPlacement] = useState('right');

    useEffect(() => {
        dispatch(userActions.getAll());
        setError(null)
    }, [])


    const showDrawer = () => {
        setVisible(true);
    };

    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const onClose = () => {
        setVisible(false);
    };

    const submit = (e) => {
        e.preventDefault();
        setError(null)
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps, 'props')

        if(formProps.name && formProps.email && formProps.password){
            const reqb = {
                "name": formProps.name,
                "email" : formProps.email,
                "password"  :formProps.password,
                "passwordConfirm" : formProps.password
              }
              dispatch(userActions.create(reqb))

              setTimeout(() => {
                window.location.reload()
              }, 1000);
        }else{
            setError('Fill all the fields')
        }
    }

    return (
        <div className='p-12 flex flex-col gap-10'>
            <div className='ml-auto'>
                <button onClick={showDrawer} className='bg-primary px-5 py-2 text-white rounded'>+ Add</button>
            </div>
            {
                userDetails.error ? <div></div> :  <div>
                    <Table columns={columns} loading={userDetails?.loading} data={userDetails?.data?.data} />
                </div>
            }

            <Drawer
                title="Create New Doctor"
                placement={placement}
                width={500}
                onClose={onClose}
                visible={visible}
            >
                <form onSubmit={submit} className="flex flex-col h-full">


                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Name :</div>
                            <div className='w-5/6'>
                                <input type={"text"} required={true} name="name" className='w-full p-2 border rounded' />
                            </div>
                        </div>
                        <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Email :</div>
                            <div className='w-5/6'>
                                <input type={"email"} required={true} name="email" className='w-full p-2 border rounded' />
                            </div>
                        </div>

                        <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Password :</div>
                            <div className='w-5/6'>
                                <input type={"password"} required={true} name="password" className='w-full p-2 border rounded' />
                            </div>
                        </div>
                        {/* <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Confirm Password :</div>
                            <div className='w-5/6'>
                                <input type={"password"} required={true} name="confirmPassword" className='w-full p-2 border rounded' />
                            </div>
                        </div> */}

                    </div>
                    <div className='mt-auto ml-auto flex gap-5'>
                        <button onClick={onClose} className='bg-gray-500 px-4 py-2 text-white rounded'>Cancel</button>
                        <button type='submit' className='bg-primary px-4 py-2 text-white rounded'>Submit</button>
                    </div>
                </form>

            </Drawer>

        </div>
    )
}
