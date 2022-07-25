import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URI_SLOTS} from '../config';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'slots';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const slotsActions = { ...slice.actions, ...extraActions };
export const slotsReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        slots: {}
    }
}

function createExtraActions() {
    const baseUrl = BASE_API_URI_SLOTS;

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
                state.slots = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.slots = action.payload;
            },
            [rejected]: (state, action) => {
                state.slots = { error: action.error };
            }
        };
    }
    function getByDate() {
        var { pending, fulfilled, rejected } = extraActions.getByDate;
        return {
            [pending]: (state) => {
                state.slots = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.slots = action.payload;
            },
            [rejected]: (state, action) => {
                state.slots = { error: action.error };
            }
        };
    }

    function create() {
        var { pending, fulfilled, rejected } = extraActions.create;
        return {
            [pending]: (state) => {
                state.slots = { loading: true };
            },
            [fulfilled]: (state, action) => {
                const existingData = state?.slots?.data ? state.slots.data : []
                const newData = [...existingData, action.payload && action.payload.data && action.payload.data.doc ?action.payload.data.doc : {}]
                state.slots.data = newData;
            },
            [rejected]: (state, action) => {
                state.slots = { error: action.error };
            }
        };
    }
}