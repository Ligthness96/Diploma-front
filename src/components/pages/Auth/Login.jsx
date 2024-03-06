import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form'
import styles from './Auth.module.css';
import { fetchAuth, selectIsAuth } from '../../../redux/slices/auth';


export default function Login() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            login: '',
            password: ''
        },
        mode: onchange
    })
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if (!data.payload) {
            alert('Не удалось авторизоваться')
        } else if ('token' in data.payload) {
            window.localStorage.setItem('userid', data.payload.userid)
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.authContent}>
                    <TextField 
                        className={styles.input} 
                        label='Логин' 
                        error={Boolean(errors.login?.message)}
                        helperText = {errors.login?.message}
                        { ... register('login', { required: 'Укажите логин' })}
                    />
                    <TextField 
                        className={styles.input} 
                        label='Пароль' 
                        type='password'
                        error={Boolean(errors.password?.message)}
                        helperText = {errors.password?.message}
                        { ... register('password', { required: 'Укажите пароль' })}
                    />
                    <button className={styles.button} type="submit">Войти</button>
                </div>
            </form>
        </div>
    )
}



