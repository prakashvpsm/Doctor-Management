import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URI_PATIENTS} from '../config';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'patients';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const patientsActions = { ...slice.actions, ...extraActions };
export const patientsReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        patients: {}
    }
}

function createExtraActions() {
    const baseUrl = BASE_API_URI_PATIENTS;

    return {
        getAll: getAll(),
        create : create(),
        getByDate : getByDate()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
    function create() {
        return createAsyncThunk(
            `${name}`,
            async (data) => await fetchWrapper.post(baseUrl, {...data})
        );
    }
    function getByDate() {
        return createAsyncThunk(
            `${name}`,
            async ({id, date}) => await fetchWrapper.get(`${baseUrl}/${id}/${date}`)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...create(),
        ...getByDate()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.patients = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.patients = action.payload;
            },
            [rejected]: (state, action) => {
                state.patients = { error: action.error };
            }
        };
    }
    function getByDate() {
        var { pending, fulfilled, rejected } = extraActions.getByDate;
        return {
            [pending]: (state) => {
                state.patients = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.patients = action.payload;
            },
            [rejected]: (state, action) => {
                state.patients = { error: action.error };
            }
        };
    }

    function create() {
        var { pending, fulfilled, rejected } = extraActions.create;
        return {
            [pending]: (state) => {
                state.patients = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.patients = action.payload;
            },
            [rejected]: (state, action) => {
                state.patients = { error: action.error };
            }
        };
    }
}