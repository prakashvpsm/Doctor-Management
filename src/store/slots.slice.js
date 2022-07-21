import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_API_URI } from '../config';

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
    const baseUrl = BASE_API_URI;

    return {
        getAll: getAll()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
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
}