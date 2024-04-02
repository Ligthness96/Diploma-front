import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchProject = createAsyncThunk('/project/fetchProject', async (params) => {
    const { data } = await axios.get('/project/fetch/id', { params })
    return data
})

export const createProject = createAsyncThunk('/project/createProject', async (params) => {
    const { data } = await axios.post('/project/create', params)
    return data
})

const initialState = {
    project: {
        data: null,
        status: 'loading'
    }
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducer: {},
    extraReducers: builder => {
        builder
         .addCase(fetchProject.pending, (state) => {
            state.project.data = null
            state.project.status = 'loading'
         })
         .addCase(fetchProject.fulfilled, (state, action) => {
            state.project.data = action.payload
            state.project.status = 'loaded'
         })
         .addCase(fetchProject.rejected, (state) => {
            state.project.data = null
            state.project.status = 'error'
         })
        }
})

export const projectReducer = projectSlice.reducer
