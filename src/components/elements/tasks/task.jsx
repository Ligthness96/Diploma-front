import react, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './task.module.css'
import Checkbox from '@mui/material/Checkbox'
import { deleteTask, editIsComplete } from '../../../redux/slices/task';
import { useDispatch } from 'react-redux';

export const Task = ({
    taskid,
    projectid,
    taskname,
    executor,
    datestart,
    dateend,
    iscomplet,
}) => {
  
    const dispatch = useDispatch()
    const [check, setCheck] = useState(iscomplet)

    const editCheck = async () => {
        const data = await dispatch(editIsComplete({taskid: taskid, iscomplete: !check}))
        if (!data.payload) {
            alert('Не удалось изменить статус')
        } else {
            setCheck(current => !current)
        }
    }  
    const handleDeleteTask = async () => {
      if (window.confirm('Вы уверены?')) {
        const data = await dispatch(deleteTask({taskid: taskid}))
        if (!data.payload) {
            alert('Не удалось удалить задачу')
        }
    }
  }  

    return (
        <Card className={styles.taskCard} style={{backgroundColor: !iscomplet ? 'rgb(207, 235, 235)' : 'rgb(207, 235, 216)'}}>
          <CardContent className={styles.taskContent}>
          <div class={styles.title}>
            {taskname}
          </div>
          <div class={styles.controls}>
            <Checkbox defaultChecked={iscomplet ? true : false} onClick={editCheck}></Checkbox>
            <button className={styles.button} onClick={handleDeleteTask}>Удалить</button>
          </div>
          </CardContent>
        </Card>
    );
}