import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const createTask = createAsyncThunk('/task/createTask', async (params) => {
    const { data } = await axios.post('/task/create',  params )
    return data
})

export const editIsComplete = createAsyncThunk('/task/editIsComplete', async (params) => {
    const { data } = await axios.post('/task/edit/iscomplete',  params )
    return data
})

export const deleteTask = createAsyncThunk('/task/deleteTask', async (params) => {
    const { data } = await axios.post('/task/delete',  params )
    return data
})

const initialState = {
    task: {
        data: null,
        status: 'loading'
    }
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
         .addCase(createTask.pending, (state) => {
            state.task.data = null
            state.task.status = 'loading'
         })
         .addCase(createTask.fulfilled, (state, action) => {
            state.task.data = action.payload
            state.task.status = 'loaded'
         })
         .addCase(createTask.rejected, (state) => {
            state.task.data = null
            state.task.status = 'error'
         })
        }
})

export const taskReducer = taskSlice.reducer
