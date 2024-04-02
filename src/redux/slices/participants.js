import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchParticipants = createAsyncThunk('/participants/fetchParticipants', async (params) => {
    const { data } = await axios.get('/participants/fetch',  {params} )
    return data
})

const initialState = {
    participants: {
        items: [],
        status: 'loading'
    }
}

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
         .addCase(fetchParticipants.pending, (state) => {
            state.participants.items = []
            state.participants.status = 'loading'
         })
         .addCase(fetchParticipants.fulfilled, (state, action) => {
            state.participants.items = action.payload
            state.participants.status = 'loaded'
         })
         .addCase(fetchParticipants.rejected, (state) => {
            state.participants.items = []
            state.participants.status = 'error'
         })
        }
})

export const participantsReducer = participantsSlice.reducer