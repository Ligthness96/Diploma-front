import React from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './Auth.css'
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth';


export default function Register() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            login: '',
            password: ''
        },
        mode: onchange
    })
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if (!data.payload) {
            alert('Не удалось зарегестрироваться, попробуйте другой логин')
        } else if ('token' in data.payload) {
            window.localStorage.setItem('userid', data.payload.userid)
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <div className="register-page">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-card">
                    <TextField 
                        className='inp input-name' 
                        label='Имя' 
                        error={Boolean(errors.name?.message)}
                        helperText = {errors.name?.message}
                        { ... register('name', { required: 'Введите имя' })}
                    />
                    <TextField 
                        className='inp input-name' 
                        label='Логин' 
                        error={Boolean(errors.login?.message)}
                        helperText = {errors.login?.message}
                        { ... register('login', { required: 'Придумайте логин' })}
                    />
                    <TextField 
                        className='inp input-password' 
                        label='Пароль' 
                        error={Boolean(errors.password?.message)}
                        helperText = {errors.password?.message}
                        { ... register('password', { required: 'Введите пароль' })}
                    />
                    <button className="register-btn" type="submit">Зарегестрироваться</button>
                </div>
            </form>
        </div>
    )
}