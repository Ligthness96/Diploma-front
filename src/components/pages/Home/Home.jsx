import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProjects } from '../../../redux/slices/projects';
import { selectIsAuth } from '../../../redux/slices/auth';
import { Project } from '../../projects/project';
import { NewProject } from '../../projects/new_project';
import { JoinProject } from '../../projects/join_project';
import styles from './Home.css'
import { Divider } from '@mui/material';


export default function Home() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const { projects } = useSelector(state => state.projects)

    const isProjectsLoading = projects.status === 'loading'

    useEffect(() => {
        dispatch(fetchProjects({userid: window.localStorage.getItem('userid')}))
    }, [])
    
    if (!isAuth) {
        return <Navigate to="/login"/>
    }

    return(
        <div className='home-body'>
            <div className='projects'>
                <div className='my-projects'>
                        {projects.items.map((obj, index) => 
                        isProjectsLoading ? (
                            <>
                            </>
                        ) : (
                            <Project
                                _id={obj.projectid}
                                name={obj.projectname}
                            />
                        ))}
                        <NewProject/>
                </div>
                <Divider className='divider' orientation="horizontal" variant="middle" flexItem />
                <div className='other-projects'>
                        {[...Array(3)].map(() => (
                            <Project
                                _id={1}
                                name="Project"
                            />
                        ))}
                        <JoinProject/>
                </div>
            </div>
        </div>
    )
}