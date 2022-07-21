import React from 'react'
import Layout from '../../components/layout'
import Doctors from './doctors'
import {  useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';

export default function Admin() {
  const dispatch = useDispatch();


  const logout = () => {
    dispatch(authActions.logout());
  }

  return (
    <div>
      <div className='h-16 bg-primary shadow-lg px-10 flex items-center w-full'>
        <div className='flex items-center w-full'>
          <div className='font-bold text-white text-xl'>DM</div>
          <div className='ml-auto text-white cursor-pointer' onClick={() => logout()}>Logout</div>
        </div>
      </div>
      <Layout>
          <Doctors />
      </Layout>
    </div>
  )
}
