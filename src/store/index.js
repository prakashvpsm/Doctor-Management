import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './user.slice';
import { slotsReducer } from './slots.slice';
import { patientsReducer } from './patients.slice';

export * from './auth.slice';
export * from './user.slice';
export * from './slots.slice';
export * from './patients.slice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        slots : slotsReducer,
        patients : patientsReducer
    },
});