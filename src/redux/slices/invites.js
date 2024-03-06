import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const createInvite = createAsyncThunk('/invites/createInvite', async (params) => {
    const { data } = await axios.post('/invite/create', params)
    return data
})

export const joinInvite = createAsyncThunk('/invites/joinInvite', async (params) => {
    const { data } = await axios.post('/invite/join', params)
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const invitesSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
         .addCase(createInvite.pending, (state) => {
            state.data = null
            state.status = 'loading'
         })
         .addCase(createInvite.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
         })
         .addCase(createInvite.rejected, (state) => {
            state.data = null
            state.status = 'error'
         })
        }
})

export const invitesReducer = invitesSlice.reducer
