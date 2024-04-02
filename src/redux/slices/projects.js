import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchProjects = createAsyncThunk('/projects/fetchProjects', async (params) => {
    const { data } = await axios.get('/project/fetchall', { params })
    return data
})

const initialState = {
    projects: {
        items: [],
        status: 'loading'
    }
}


const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducer: {},
    extraReducers: builder => {
        builder
         .addCase(fetchProjects.pending, (state) => {
            state.projects.items = []
            state.projects.status = 'loading'
         })
         .addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects.items = action.payload
            state.projects.status = 'loaded'
         })
         .addCase(fetchProjects.rejected, (state) => {
            state.projects.items = []
            state.projects.status = 'error'
         })
        }
})

export const projectsReducer = projectsSlice.reducer