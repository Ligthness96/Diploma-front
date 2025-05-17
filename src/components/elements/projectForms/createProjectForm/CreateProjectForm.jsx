import React, { useEffect, useRef } from "react";
import styles from '../ProjectForm.module.css'
import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material';
import { createProject } from "../../../../redux/slices/project";
import { useDispatch } from "react-redux";


const CreateProjectForm = ({show, onConfirm, onCancel, onClose}) => {
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectname: '',
            owner: window.localStorage.getItem('userid')
        },
        mode: onchange
    })

    const onSubmit = async (values) => {
        const data = await dispatch(createProject(values))
        if (!data.payload) {
            onClose()
            alert('Не удалось создать проект')
        } else {
            onClose()
            alert('Проект создан')
        }
    }

    const closeModalOnClickOut = (e) => {
        if (show && e.target && modalRef.current && !modalRef.current.contains(e.target) && onClose) {
            onClose()
        }
    }

    useEffect(() => {
        document.body.addEventListener('mousedown', closeModalOnClickOut)
        return () => {
            document.body.removeEventListener('mousedown', closeModalOnClickOut)
        }
    }, [closeModalOnClickOut])

    if(show) {
        return (
            <div className={styles.modalBackdrop}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div ref={modalRef} className={styles.modalContent}>
                        <Typography variant="h4" className={styles.text}>
                            Новый проект
                        </Typography>
                        <TextField
                            className={styles.textField} 
                            label='Название проекта' 
                            error={Boolean(errors.projectname?.message)}
                            helperText = {errors.projectname?.message}
                            { ... register('projectname', { required: 'Название не должно быть пустым' })}
                        />
                        <button className={styles.button} type="submit">Создать</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateProjectForm
