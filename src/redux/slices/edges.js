import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchEdges = createAsyncThunk('/edges/fetchEdges', async (params) => {
    const { data } = await axios.get('/graph/edges', { params })
    return data
})

const initialState = {
    edgesss: {
        items: [],
        status: 'loading'
    } 
}

const edgesSlice = createSlice({
    name: 'edgesss',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
         .addCase(fetchEdges.pending, (state) => {
            state.edgesss.items = []
            state.edgesss.status = 'loading'
         })
         .addCase(fetchEdges.fulfilled, (state, action) => {
            state.edgesss.items = action.payload
            state.edgesss.status = 'loaded'
         })
         .addCase(fetchEdges.rejected, (state) => {
            state.edgesss.items = []
            state.edgesss.status = 'error'
         })
        }
})

export const edgesReducer = edgesSlice.reducer