import React, { useState, useEffect } from 'react'
import { Calendar, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';
import sunriseImg from '../../assets/sunrise.png'
import sunset from '../../assets/sunset.png'
import { useDispatch, useSelector } from 'react-redux';
import { userActions, slotsActions, patientsActions } from '../../store';

const { Option } = Select;

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
  const [selectedDate, setDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState(null);



  const dispatch = useDispatch();

  const userDetails = useSelector(x => x.users.doctors);
  const slotDetails = useSelector(x => x.slots.slots);
  const patientDetails = useSelector(x => x.patients.patients);



  useEffect(() => {
    dispatch(userActions.getDoctors())
  }, []);

  const onChange = (date, dateString) => {
    setDate(dateString);
    const b = {
      id: selectedDoctor,
      date: `${moment(date).format("DD-MM-YYYY")}`,
    }
    dispatch(slotsActions.getByDate(b));

  };


  const book = (id) => {
    setselectedDoctor(id)
    setDate(null);
    setSelectedSlot(null);

  }

  const submit = (e) => {

    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (selectedDate && selectedDoctor && selectedSlot && formProps.email && formProps.name) {
      const reqB = {
        date: `${moment(selectedDate).format("DD-MM-YYYY")}`,
        doctorID: selectedDoctor,
        slotId: selectedSlot,
        slotText: slotDetails.data.filter(d => d._id === selectedSlot)[0].textTime,
        name: formProps.name,
        email: formProps.email
      }
      dispatch(patientsActions.create(reqB))
    } else {
      setError('fill all required(*) fields')
    }
  }

  const changedropdown = (value) => {
    setSelectedSlot(value)
  }


  const sortArrayOfObj = (filteredDates) => {
    if (filteredDates.length > 0) {
      const dd = filteredDates.slice().sort(function (a, b) {
          return a.from.localeCompare(b.from);
      });
      return dd
  } else {
      return filteredDates
  }
  }

  console.log(patientDetails, 'patientDetails')


  return (
    <div className='h-screen flex flex-col'>
      <div className='h-20 bg-primary shadow-lg px-10 flex items-center w-full'>
        <div className='flex items-center w-full'>
          <div className='font-bold text-white text-xl py-5'>DM</div>
        </div>
      </div>
      {
        patientDetails && patientDetails.loading ? <div>....Loading</div> : patientDetails.status === 'success' ? <div className='bg-white w-8/12 mx-auto p-10 rounded-lg shadow shadow-blue-200 mt-10'>
          <div className='flex flex-col justify-center items-center gap-10'>
            <div className='text-center text-xl font-bold'>
              Appointment Confirmed
            </div>
            <div className=''>
            {/* <div>
               <span className='font-bold'> Doctor Name :</span>  {userDetails && userDetails.data ? userDetails.data.filter(d => d._id === patientDetails.data.doc.doctorID)[0].name : ''}
              </div> */}
              <div className=''>
               <span className='font-bold'> Date :</span>  {patientDetails && patientDetails.data && patientDetails.data.doc && patientDetails.data.doc.date ? patientDetails.data.doc.date : ''}
              </div>
              <div>
               <span className='font-bold'> Slot :</span>  {patientDetails && patientDetails.data && patientDetails.data.doc && patientDetails.data.doc.slotText ? patientDetails.data.doc.slotText : ''}
              </div>
            </div>
          </div>
        </div> : <div className='p-20 bg-primary/5'>
          <div className='bg-white w-11/12 mx-auto p-10 rounded-lg shadow shadow-blue-200'>
            <div className='flex'>
              <div className='text-xl font-bold'>Available Doctors List</div>
              <div className='ml-auto'>
                {/* <DatePicker className='border-2 border-primary py-2 px-10 bg-gray-100 rounded' onChange={onChange} /> */}

              </div>
            </div>


            <div className='flex flex-col gap-10 mt-20'>
              {
                userDetails.loading ? <div>...loading</div> : userDetails.data && userDetails.data.length > 0 ? <div>

                  {
                    userDetails.data.map((doc, i) => {
                      return <div className='flex flex-col gap-10'>
                        <div className='flex'>
                          <div className='w-2/12'>
                            <div className='w-32 h-32 bg-gray-200 rounded'></div>

                          </div>
                          <div className='flex flex-col gap-3 w-10/12'>
                            <div className='text-lg font-bold'>{doc.name}</div>
                            <div className='text-sm text-gray-700 -mt-2 font-semibold'>{doc.email ? doc.email : ''}</div>
                            <p className='text-xs'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est ligula, varius vitae nunc at, semper consequat lectus. Sed ac mauris lacinia, finibus leo ac, tristique lectus. Fusce ultrices ipsum quam, vel porttitor turpis hendrerit vel. Ut vehicula vehicula ligula, et vestibulum ante rutrum egestas. In hac habitasse platea dictumst. Nulla congue laoreet mattis. Donec at vehicula libero, accumsan pharetra ligula. Vivamus at dictum
                            </p>
                            <div className='ml-auto mt-10'>
                              <button onClick={() => book(doc._id)} className='bg-primary px-5 py-2 text-white rounded-lg shadow-lg shadow-blue-200'>Book Appointment</button>
                            </div>
                          </div>
                        </div>
                        {
                          selectedDoctor && selectedDoctor === doc._id ? <div className='p-10'>
                            <div className='w-3/6 mx-auto border rounded shadow p-10'>
                              <form onSubmit={submit}>
                                <div className='flex flex-col gap-5'>
                                  <div className='flex justify-start flex-col items-start gap-5'>
                                    <div className='text-xs font-bold uppercase tet-xs'>*Date :</div>
                                    <div className='w-5/6'>
                                      <DatePicker className='border-2 py-2 px-10 bg-gray-100 rounded' onChange={onChange} />
                                    </div>
                                  </div>
                                  <div className='flex justify-start flex-col items-start gap-5'>
                                    <div className='text-xs font-bold uppercase tet-xs'>*Select Slot :</div>
                                    <div className='w-full'>
                                      <Select size='large' loading={slotDetails.loading} defaultValue="Select" disabled={!selectedDate && !slotDetails.data} style={{ width: 120 }} onChange={changedropdown}>
                                        {
                                            
                                          selectedDate && slotDetails && slotDetails.data && slotDetails.data.length > 0 ? sortArrayOfObj(slotDetails.data).map((slt, i) => {
                                            return slt.status && slt.status === 'booked' ? <Option value={slt._id} disabled>{slt.textTime}</Option> :  <Option value={slt._id}>{slt.textTime}</Option>
                                          }) : <Option disabled value="0">No Options Avail</Option>
                                        }

                                      </Select>
                                    </div>
                                  </div>
                                  <div className='flex justify-start flex-col items-start gap-5'>
                                    <div className='text-xs font-bold uppercase tet-xs'>*Email :</div>
                                    <div className='w-5/6'>
                                      <input type="email" name="email" id='email' className='w-full border p-2 rounded' />
                                    </div>
                                  </div>
                                  <div className='flex justify-start flex-col items-start gap-5'>
                                    <div className='text-xs font-bold uppercase tet-xs'>*Name :</div>
                                    <div className='w-5/6'>
                                      <input type="text" name="name" id='name' className='w-full border p-2 rounded' />
                                    </div>
                                  </div>

                                  {
                                    error ? <div className='text-red-600 py-5 '>
                                      {error}
                                    </div> : <></>
                                  }

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
                </div> : <div>
                  No doctors available at the moment
                </div>
              }

            </div>
          </div>
        </div>
      }

    </div>
  )
}
