import React, { useState } from 'react'
import { Calendar, Radio, DatePicker } from 'antd';

import sunriseImg from '../../assets/sunrise.png'
import sunset from '../../assets/sunset.png'

const doctors = [
  {
    name: 'Test',
    category: 'dummy',
    id: 1
  },
  {
    name: 'Test 1',
    category: 'dummy',
    id: 2
  }
]

export default function Home() {

  const [selectedDoctor, setselectedDoctor] = useState(null)


  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const book = (id) => {
    setselectedDoctor(id)
  }

  const submit = (e) => {

  }

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-20 bg-primary shadow-lg px-10 flex items-center w-full'>
        <div className='flex items-center w-full'>
          <div className='font-bold text-white text-xl'>DM</div>
        </div>
      </div>
      <div className='p-20 bg-primary/5'>
        <div className='bg-white w-11/12 mx-auto p-10 rounded-lg shadow shadow-blue-200'>
          <div className='flex'>
            <div className='text-xl font-bold'>Available Doctors List</div>
            <div className='ml-auto'>
              {/* <DatePicker className='border-2 border-primary py-2 px-10 bg-gray-100 rounded' onChange={onChange} /> */}

            </div>
          </div>


          <div className='flex flex-col gap-10 mt-20'>
            {
              doctors.map((doc, i) => {
                return <div className='flex flex-col gap-10'>
                  <div className='flex'>
                    <div className='w-2/12'>
                      <div className='w-32 h-32 bg-gray-200 rounded'></div>

                    </div>
                    <div className='flex flex-col gap-3 w-10/12'>
                      <div className='text-lg font-bold'>{doc.name}</div>
                      <div className='text-sm text-gray-700 -mt-2 font-semibold'>{doc.category ? doc.category : ''}</div>
                      <p className='text-xs'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est ligula, varius vitae nunc at, semper consequat lectus. Sed ac mauris lacinia, finibus leo ac, tristique lectus. Fusce ultrices ipsum quam, vel porttitor turpis hendrerit vel. Ut vehicula vehicula ligula, et vestibulum ante rutrum egestas. In hac habitasse platea dictumst. Nulla congue laoreet mattis. Donec at vehicula libero, accumsan pharetra ligula. Vivamus at dictum
                      </p>
                      <div className='ml-auto mt-10'>
                        <button onClick={() => book(doc.id)} className='bg-primary px-5 py-2 text-white rounded-lg shadow-lg shadow-blue-200'>Book Appointment</button>
                      </div>
                    </div>
                  </div>
                  {
                    selectedDoctor && selectedDoctor === doc.id ? <div className='p-10'>
                      <div className='w-3/6 mx-auto border rounded shadow p-10'>
                        <form onSubmit={submit}>
                          <div className='flex flex-col gap-5'>
                            <div className='flex justify-start flex-col items-start gap-5'>
                              <div className='text-xs font-bold uppercase tet-xs'>Date :</div>
                              <div className='w-5/6'>
                                <DatePicker className='border-2 py-2 px-10 bg-gray-100 rounded' onChange={onChange} />
                              </div>
                            </div>
                            <div className='flex justify-start flex-col items-start gap-5'>
                              <div className='text-xs font-bold uppercase tet-xs'>Select Slot :</div>
                              <div className='w-5/6'>
                                <DatePicker className='border-2 py-2 px-10 bg-gray-100 rounded' onChange={onChange} />
                              </div>
                            </div>
                            <div className='flex justify-start flex-col items-start gap-5'>
                              <div className='text-xs font-bold uppercase tet-xs'>Email :</div>
                              <div className='w-5/6'>
                                <input type="email" name="email" id='email' className='w-full border p-2 rounded' />
                              </div>
                            </div>
                            <div className='flex justify-start flex-col items-start gap-5'>
                              <div className='text-xs font-bold uppercase tet-xs'>Name :</div>
                              <div className='w-5/6'>
                                <input type="text" name="name" id='name' className='w-full border p-2 rounded' />
                              </div>
                            </div>

                            <div className='mx-auto mt-10'>
                              <button type='submit' className='px-6 py-2 bg-primary rounded text-white'>Book</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> : <></>
                  }


                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
