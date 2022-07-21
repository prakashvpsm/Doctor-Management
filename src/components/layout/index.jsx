import React from 'react';
import Header from '../header';
import SideBar from '../sidebar';

export default function Layout(props) {
  return (
    <div className='w-full flex bg-gray-50'>
        <div>
            <SideBar />
        </div>
        <div className='w-full'>
            {props.children}
        </div>
    </div>
  )
}
