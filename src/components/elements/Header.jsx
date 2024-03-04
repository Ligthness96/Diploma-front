import { Avatar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectIsAuth, logout } from '../../redux/slices/auth';
import avatarExample from '../photos/avatar-example.png'
import styles from './Header.css';

export default function Header() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate();
    const onClickLogout = () => {
        if (window.confirm('Вы уверены, что хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('userid')
        }
    }

    
    
    return(
        <header className="App-header">
            <div className='Header-buttons'>
                {isAuth ? (
                    <>
                        <div className='header-main'>
                            <Avatar className='avatar' src={avatarExample} alt="avatar"/>
                            <button onClick={onClickLogout} className = 'header-btn btn-logout'>Выход</button>
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')} className = 'header-btn btn-login'>Вход</button>
                        <button onClick={() => navigate('/register')} className = 'header-btn btn-register'>Регистрация</button>
                    </>
                )}
            </div>
        </header>
    )
}

