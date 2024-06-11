import React, { useEffect, useRef } from "react";
import styles from '../ProjectForm.module.css'
import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { joinInvite } from "../../../../redux/slices/invites";


const JoinProjectForm = ({show, onConfirm, onCancel, onClose}) => {
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            code: '',
            userid: window.localStorage.getItem('userid')
        },
        mode: onchange
    })

    const onSubmit = async (values) => {
        const data = await dispatch(joinInvite(values))
        if (!data.payload) {
            onClose()
            alert('Не удалось присоединиться')
        } else {
            onClose()
            alert('Вы присоединились к проекту')
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div ref={modalRef} className={styles.modalContent}>
                        <Typography variant="h5" className={styles.text}>
                            Присоединиться к проекту
                        </Typography>
                        <TextField
                            className={styles.textField} 
                            label='Код приглашения' 
                            error={Boolean(errors.projectname?.message)}
                            helperText = {errors.projectname?.message}
                            { ... register('code', { required: 'Поле не должно быть пустым' })}
                        />
                        <button className={styles.button} type="submit">Присоединиться</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default JoinProjectForm