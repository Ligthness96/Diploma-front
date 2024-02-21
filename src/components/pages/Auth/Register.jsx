import React from 'react';
import styles from './Auth.css'


export default function Register() {
    return (
        <div className="register-page">
            <div className="auth-card">
                <input className='inp input-name' />
                <input className='inp input-login'/>
                <input className='inp input-password'/>
                <input className='inp input-repassword'/>
                <button className="register-btn" type="submit">Зарегестрироваться</button>
            </div>
        </div>
    )
}