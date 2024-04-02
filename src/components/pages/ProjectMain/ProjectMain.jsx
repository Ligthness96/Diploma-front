import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { selectIsAuth } from '../../../redux/slices/auth';
import { fetchProject } from '../../../redux/slices/project';
import { fetchTasks } from '../../../redux/slices/tasks';
import homeIcon from '../../photos/iconHome.png';
import listIcon from '../../photos/iconList.png';
import diagramIcon from '../../photos/iconDiagram.png';
import teamIcon from '../../photos/iconTeam.png';
import styles from './ProjectMain.module.css';

import TableTasks from './Table/TableTasks';
import Participants from './Participants/Participants';
import Graph from './Graph/Graph';


export default function Main() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const { state: { id } = {} } = useLocation()
    window.localStorage.setItem("projectid", id)
    const { project } = useSelector(state => state.project)
    const { tasks } = useSelector(state => state.tasks)
    const isProjectLoaded = project.status === 'loaded'
    const isTasksLoading = tasks.status === 'loading'

    useEffect(() => {
        dispatch(fetchTasks({projectid: id}))
        dispatch(fetchProject({projectid: id}))
    }, [])
    
    const [table, setTable] = useState(true)
    const [participants, setParticipants] = useState(false)
    const [graph, setGraph] = useState(false)

    if (!isAuth) {
        window.localStorage.removeItem("projectid")
        return <Navigate to="/login"/>     
    }

    return(
        <>
            
            <div className={styles.body}>
                <aside className={styles.nav}>
                    <div className={styles.navContent}>
                        <Link to='/' draggable="false">
                            <img src={homeIcon} className={styles.icon} alt='home' draggable="false"/>
                        </Link>

                        <img src={listIcon} onClick={() => {setTable(true); setParticipants(false); setGraph(false)}} className={styles.icon} alt='list' draggable="false"/>
                        <img src={diagramIcon} onClick={() => {setGraph(true); setTable(false); setParticipants(false)}} className={styles.icon} alt='diagram'  draggable="false"/>
                        <img src={teamIcon} onClick={() => {setParticipants(true); setTable(false); setGraph(false)}} className={styles.icon} alt='team'  draggable="false"/>

                    </div>
                </aside>
                <div className={styles.content}>
                    <TableTasks show={table}/>
                    <Participants show={participants}/>
                    <Graph show={graph}/>
                </div>
            </div>
        </>
    )
}