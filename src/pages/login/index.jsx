import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store';
import { history } from '../../helpers';

import bg from '../../assets/bg.jpg'

const Login = () => {

    const dispatch = useDispatch();

    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        if (authUser) {
            console.log(authUser, 'auth')
            if(authUser && authUser.data && authUser.data.user){
                if(authUser.data.user.role){
                  if(authUser.data.user.role === 'admin'){
                    // history.navigate('/')
                  }else if(authUser.data.user.role === 'doctors'){
                    // history.navigate('/doctor')
                  }  
                }
            }
        }
    }, []);

    const submit =async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps, 'formProps')
        dispatch(authActions.login(formProps));
    }

    console.log(authUser, authError, 'error')

    return <div className='w-full h-screen bg-blue-200 p-20'>
        <div className='flex w-4/6 h-full bg-white mx-auto justify-center rounded-lg shadow-xl'>
            <div className='w-3/6 flex items-center justify-center'>
                <img src={bg} />
            </div>
            <div className='w-3/6 flex flex-col justify-center bg-white gap-10 p-10  '>
                <h2 className='text-2xl font-bold text-center '>Welcome to DM APP </h2>
                <p className='text-sm font-bold text-center '>Please login to continue</p>
                <form onSubmit={submit}>
                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Email :</div>
                            <div className='w-5/6'>
                                <input type="text" name="email" id='email' className='w-full border p-2 rounded' />
                            </div>
                        </div>
                        <div className='flex justify-start flex-col items-start gap-5'>
                            <div className='text-xs font-bold uppercase tet-xs'>Password :</div>
                            <div className='w-5/6'>
                                <input type="password" name="password" id='password' className='w-full border p-2 rounded' />
                            </div>
                        </div>
                        {
                            authError && authError.message ? <div className='p-2 w-5/6 mt-5 bg-red-300 rounded text-red-800 text-center'>
                                {authError.message}
                            </div> : <></>
                        }
                        <div className='mx-auto mt-10'>
                            <button type='submit' className='px-6 py-2 bg-primary rounded text-white'>Login</button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    </div>
}


export default Login;;