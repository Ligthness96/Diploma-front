import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectIsAuth, logout } from '../../../redux/slices/auth';
import avatarExample from '../../photos/avatar-example.png'
import styles from './Header.module.css';

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
        <header className={styles.header}>
            <div className={styles.content}>
                {isAuth ? (
                    <>
                        <div className={styles.main}>
                            <img className={styles.avatar} src={avatarExample} alt="avatar" draggable="false"/>
                            <button onClick={onClickLogout} className={styles.buttonLogout}>Выход</button>
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')} className={styles.button}>Вход</button>
                        <button onClick={() => navigate('/register')} className={styles.button}>Регистрация</button>
                    </>
                )}
            </div>
        </header>
    )
}

