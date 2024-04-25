import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const createEdge = createAsyncThunk('/edge/createEdge', async (params) => {
    const { data } = await axios.post('/graph/edge/create',  params )
    return data
})

export const deleteEdge = createAsyncThunk('/edge/deleteEdge', async (params) => {
    const { data } = await axios.post('/graph/edge/delete',  params )
    return data
})

const initialState = {
    edge: {
        data: null,
        status: 'loading'
    }
}

const edgeSlice = createSlice({
    name: 'edge',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
         .addCase(createEdge.pending, (state) => {
            state.edge.data = null
            state.edge.status = 'loading'
         })
         .addCase(createEdge.fulfilled, (state, action) => {
            state.edge.data = action.payload
            state.edge.status = 'loaded'
         })
         .addCase(createEdge.rejected, (state) => {
            state.edge.data = null
            state.edge.status = 'error'
         })
        }
})

export const edgeReducer = edgeSlice.reducer