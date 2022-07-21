import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '../helpers';
import { BASE_API_URI } from '../config';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    const item = localStorage.getItem('user');
    return {
        // initialize state from local storage to enable user to stay logged in
        user:item ?  JSON.parse(item) : null,
        error: null,
        userType : null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        state.userType = null
        localStorage.removeItem('user');
        history.navigate('/login');
    }
}

function createExtraActions() {
    const baseUrl = BASE_API_URI;

    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ email, password }) => await fetchWrapper.post(`${baseUrl}/login`, { email, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                const authUser = user

                const { from } = history.location.state || { from: { pathname: '/' } };

                if (authUser) {
                    console.log(authUser, 'auth')
                    if(authUser && authUser.data && authUser.data.user){
                        if(authUser.data.user.role){
                          if(authUser.data.user.role === 'admin'){
                            state.userType = 'admin'
                            history.navigate('/')
                          }else if(authUser.data.user.role === 'doctor'){
                            state.userType = 'doctor'
                            history.navigate('/doctors')
                          }  
                        }
                    }
                }
                // history.navigate(from);
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }
}