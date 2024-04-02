import react, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './task.module.css'
import Checkbox from '@mui/material/Checkbox'
import { editIsComplete } from '../../../redux/slices/task';
import { useDispatch } from 'react-redux';

export const Task = ({
    taskid,
    projectid,
    taskname,
    executor,
    datestart,
    dateend,
    iscomplet,
    onClick
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

    return (
        <Card className={styles.taskCard} style={{backgroundColor: !iscomplet ? 'rgb(207, 235, 235)' : 'rgb(207, 235, 216)'}}>
          <CardContent className={styles.taskContent}>
            <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
              {taskname}
            </Typography>
            <Checkbox defaultChecked={iscomplet ? true : false} className={styles.button} onClick={editCheck}></Checkbox>
          </CardContent>
        </Card>
    );
}