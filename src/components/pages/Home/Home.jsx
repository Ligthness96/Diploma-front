import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProjects } from '../../../redux/slices/projects';
import { selectIsAuth } from '../../../redux/slices/auth';
import { Project } from '../../elements/projects/project';
import { NewProject } from '../../elements/projects/new_project';
import { JoinProject } from '../../elements/projects/join_project';
import CreateProjectForm from '../../elements/projectForms/createProjectForm/CreateProjectForm'
import JoinProjectForm from '../../elements/projectForms/joinProjectForm/JoinProjectForm'
import styles from './Home.module.css'
import { Divider } from '@mui/material';


export default function Home() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const { projects } = useSelector(state => state.projects)
    const isProjectsLoading = projects.status === 'loading'

    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false)
    const showCPF = () => {setShowCreateProjectForm(true)}
    const hideCPF = () => {setShowCreateProjectForm(false)}

    const [showJoinProjectForm, setShowJoinProjectForm] = useState(false)
    const showJPF = () => {setShowJoinProjectForm(true)}
    const hideJPF = () => {setShowJoinProjectForm(false)}

    useEffect(() => {
        dispatch(fetchProjects({userid: window.localStorage.getItem('userid')}))
    }, [showCreateProjectForm, showJoinProjectForm])
    
    if (!isAuth) {
        return <Navigate to="/login"/>
    }
    return(
        <>
        <JoinProjectForm show={showJoinProjectForm} onClose={hideJPF}/>
        <CreateProjectForm  show={showCreateProjectForm} onClose={hideCPF}/>
        <div className={styles.body}>
            <div className={styles.projects}>
                <div className={styles.myProjects}>
                        {projects.items.map((obj, index) => 
                        isProjectsLoading || obj.owner!==window.localStorage.getItem('userid') ? (
                            <>
                            </>
                        ) : (
                            <Project
                                key={index}
                                projectid={obj.projectid}
                                projectname={obj.projectname}
                            />
                        ))}
                        <NewProject action={showCPF}/>
                </div>
                <Divider className='divider' orientation="horizontal" variant="middle" flexItem/>
                <div className={styles.otherProjects}>
                {projects.items.map((obj, index) => 
                        isProjectsLoading || obj.owner===window.localStorage.getItem('userid') ? (
                            <>
                            </>
                        ) : (
                            <Project
                                key={index}
                                projectid={obj.projectid}
                                projectname={obj.projectname}
                            />
                        ))}
                        <JoinProject action={showJPF}/>
                </div>
            </div>
        </div>
        </>
    )
}