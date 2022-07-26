import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URI } from '../config';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        users: {},
        doctors: {}
    }
}

function createExtraActions() {
    const baseUrl = BASE_API_URI;

    return {
        getAll: getAll(),
        getDoctors: getDoctors(),
        create: create()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
    function getDoctors() {
        return createAsyncThunk(
            `doctors`,
            async () => await fetchWrapper.get(`${baseUrl}/doctors`)
        );
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async (data) => await fetchWrapper.post(baseUrl, { ...data })
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...getDoctors(),
        ...create()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
    function getDoctors() {
        var { pending, fulfilled, rejected } = extraActions.getDoctors;
        return {
            [pending]: (state) => {
                state.doctors = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.doctors = action.payload;
            },
            [rejected]: (state, action) => {
                state.doctors = { error: action.error };
            }
        };

    }
    function create() {
        var { pending, fulfilled, rejected } = extraActions.create;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
}