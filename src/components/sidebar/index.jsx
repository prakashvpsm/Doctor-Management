import React from 'react';
import Search from './search';
import { Link } from 'react-router-dom';

const sideBarMenu = [
    {id: 1, name: 'Users', path: ''}
];

export default function SideBar() {
    return (
        <div className='w-72 border-r border-gray-200 h-screen bg-white flex flex-col'>
          
            <div className=''>
                {sideBarMenu.map( (sideMenu) => (
                    <div className='flex w-full bg-gray-100 px-5 '>
                     
                        <div className='p-4 text-primary font-semibold text-lg'>
                            <Link to={`/${sideMenu.path}`}>{sideMenu.name}</Link>
                        </div>
                    </div>
                ) )}
            </div>
            <div className='h-16 border-t border-gray-200 mt-auto'>
            
            </div>
        </div>
    )
}
