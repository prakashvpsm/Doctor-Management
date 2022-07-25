import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Tables from '../../components/table';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Contact',
        dataIndex: 'email',
    },
    {
        title: 'Appointment Date',
        dataIndex: 'date',
    },
    {
        title: 'Slot Time',
        dataIndex: 'slotText',
    }
];

export default function PatientLists() {
    const patientDetails = useSelector(x => x.patients.patients);
    console.log(patientDetails, 'patientDetails')
  return (
    <div className='flex flex-col gap-5'>
        <div className='font-bold text-xl'>Home</div>
        <Tables columns={columns} loading={patientDetails.loading} data={patientDetails.data ? patientDetails.data : []} />
    </div>
  )
}
