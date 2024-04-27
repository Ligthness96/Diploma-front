import React, { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './TaskForm.module.css'
import { useForm } from 'react-hook-form'
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createTask } from "../../../redux/slices/task";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants } from "../../../redux/slices/participants";

const CreateTaskForm = ({show, onConfirm, onCancel, onClose}) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    const modalRef = useRef(null)
    const { participants } = useSelector(state => state.participants)
    const isParticipantLoading = participants.status === 'loading'

    const [executor, setExecutor] = React.useState('');

    const handleChange = (event) => {
      setExecutor(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchParticipants({projectid:  window.localStorage.getItem("projectid")}))
    }, [])

    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            projectid: window.localStorage.getItem("projectid"),
            taskname: '',
            executor: '',
            datestart: '',
            dateend: ''
        },
        mode: onchange
    })

    const onSubmit = async (values) => {
        const data = await dispatch(createTask(values))
        if (!data.payload) {
            onClose()
            reset()
            alert('Не удалось добавить задачу')
        } else {
            onClose()
            reset()
        }
    }

    const closeModalOnClickOut = (e) => {
        if (show && e.target && modalRef.current && onClose) {
            onClose()
            reset()
        }
    }

    if(show) {
        return (
            <div className={styles.modalBackdrop}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div ref={modalRef} className={styles.modalContent}>
                        <Typography variant="h3" className={styles.text}>
                            Новая задача
                        </Typography>
                        <TextField
                            className={styles.textField} 
                            label='Название задачи' 
                            error={Boolean(errors.projectname?.message)}
                            helperText = {errors.projectname?.message}
                            { ... register('taskname', { required: 'Название не должно быть пустым' })}
                        />
                        <Calendar onChange={setDate} value={date} selectRange={true} />
                            {date.length > 0 ? (
                                <>
                                    {setValue('datestart', date[0].toISOString().split('T')[0])}
                                    {setValue('dateend', date[1].toISOString().split('T')[0])}
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        <div className={styles.dates}>
                            <TextField
                                className={styles.textFieldDate} 
                                error={Boolean(errors.datestart?.message)}
                                helperText = {errors.datestart?.message}
                                { ... register('datestart', { required: 'Дата не должна быть пустой' })}
                            />
                            <TextField
                                className={styles.textFieldDate} 
                                error={Boolean(errors.dateend?.message)}
                                helperText = {errors.dateend?.message}
                                { ... register('dateend', { required: 'Дата не должна быть пустой' })}
                            />
                        </div>
                        {/* <TextField
                            className={styles.textField} 
                            label='Исполнитель' 
                            error={Boolean(errors.executor?.message)}
                            helperText = {errors.executor?.message}
                            { ... register('executor', { required: 'Название не должно быть пустым' })}
                        /> */}
                        <FormControl className={styles.selector}>
                            <InputLabel id="demo-simple-select-label">Выберите исполнителя</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Выберите исполнителя"
                                value={executor}
                                onChange={handleChange}
                            > 
                            {participants.items.map((obj, index) => isParticipantLoading 
                                ? (<></>)
                                : (<MenuItem onClick={setValue('executor', obj.userid)} value={obj.name}>{obj.name}</MenuItem>)
                            )}
                            </Select>
                        </FormControl>
                        <div>
                            <button onClick={closeModalOnClickOut} className={styles.button}>Отменить</button>
                            <button className={styles.button} type="submit">Добавить</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateTaskForm