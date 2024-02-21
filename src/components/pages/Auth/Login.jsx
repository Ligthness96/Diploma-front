import React from 'react';
import styles from './Auth.css'


export default function Login() {
    return (
        <div className="login-page">
            <div className="auth-card">
                <input className='inp input-login' name="SignIn" />
                <input className='inp input-password' name="SignIn" />
                <button className="enter-btn" type="submit">Войти</button>
            </div>
        </div>
    )
}



