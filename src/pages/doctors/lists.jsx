import React from 'react'

import Tables from '../../components/table';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
    },
    {
        title: 'Appointment',
        dataIndex: 'appointment',
    }
];

export default function PatientLists() {
  return (
    <div className='flex flex-col gap-5'>
        <div className='font-bold text-xl'>Home</div>
        <Tables columns={columns} />
    </div>
  )
}
