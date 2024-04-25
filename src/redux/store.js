import { configureStore } from '@reduxjs/toolkit'
import { projectsReducer } from './slices/projects'
import { projectReducer } from './slices/project' 
import { authReducer } from './slices/auth'
import { tasksReducer } from './slices/tasks'
import { taskReducer } from './slices/task'
import { edgesReducer } from './slices/edges'
import { edgeReducer } from './slices/edge'
import { participantsReducer } from './slices/participants'

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        auth: authReducer,
        tasks: tasksReducer,
        task: taskReducer,
        edgesss: edgesReducer,
        edge: edgeReducer,
        project: projectReducer,
        participants: participantsReducer
    }
})

export default store