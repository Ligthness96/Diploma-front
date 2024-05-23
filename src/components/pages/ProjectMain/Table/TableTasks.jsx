import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../../redux/slices/tasks';
import Typography from '@mui/material/Typography';
import styles from './TableTasks.module.css';
import { Task } from '../../../elements/tasks/task';
import CreateTaskForm from '../../../elements/taskForm/CreateTaskForm'

export default function TableTasks({show}) {
    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.tasks)
    const isTasksLoading = tasks.status === 'loading'
    
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
    const showCTF = () => {setShowCreateTaskForm(true)}
    const hideCTF = () => {setShowCreateTaskForm(false)}

    useEffect(() => {
        dispatch(fetchTasks({projectid: window.localStorage.getItem("projectid")}))
    }, [showCreateTaskForm, show])


    if(show) { 
        return(
            <>
                <div className={styles.content}>
                    <CreateTaskForm show={showCreateTaskForm} onClose={hideCTF}/>
                    <div className={styles.tasksCurrent}>
                    <div className={styles.tasksHeader}>
                        <Typography variant='h5' className={styles.tiitle}>Текущие</Typography>
                        <button onClick={showCTF} className={styles.button}>Добавить</button>
                    </div>
                        {tasks.items.map((obj, index) => 
                        isTasksLoading || obj.iscomplete === true ? (
                            <>
                            </>
                        ) : (
                            <Task
                                key={index}
                                taskid={obj.taskid}
                                taskname={obj.taskname}
                                executor={obj.executor}
                                iscomplet={obj.iscomplete}
                            />
                        ))}
                    </div>
                
                    <div className={styles.tasksCompleted}>
                        <div className={styles.tasksHeader}>
                            <Typography variant='h5' className={styles.tiitle}>Выполненные</Typography>
                        </div>
                            {tasks.items.map((obj, index) => 
                            isTasksLoading || obj.iscomplete === false ? (
                                <>
                                </>
                            ) : (
                                <Task
                                    key={index}
                                    taskid={obj.taskid}
                                    taskname={obj.taskname}
                                    executor={obj.executor}
                                    iscomplet={obj.iscomplete}
                                />
                            ))}
                    </div>
                </div>
            </>
        ) 
    }
}