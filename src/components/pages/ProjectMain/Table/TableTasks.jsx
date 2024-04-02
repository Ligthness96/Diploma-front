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
                <CreateTaskForm show={showCreateTaskForm} onClose={hideCTF}/>
                <div className={styles.tasksCurrent}>
                <div className={styles.tasksHeader}>
                    <Typography variant='h4'>Текущие задачи</Typography>
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
                    {/* {[...Array(3)].map(() => (
                        <Task
                            key={1}
                            taskid="{obj.taskid}"
                            taskname="task one"
                            executor="sergey"
                            datestart="2024-01-01"
                            dateend="2024-01-01"
                        />
                    ))} */}
            </div>
            
            <div className={styles.tasksCompleted}>
                <div className={styles.tasksHeader}>
                    <Typography variant='h4'>Выполненные задачи</Typography>
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
                    {/* {[...Array(4)].map(() => (
                        <Task
                            key={0}
                            taskid="{obj.taskid}"
                            taskname="task one"
                            executor="sergey"
                            datestart="2024-01-01"
                            dateend="2024-01-01"
                        />
                    ))}  */}
            </div>
        </>
        ) 
    }
}