import { Checkbox } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Header.css';

export default function Header() {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      setIsActive(current => !current);
    };

    const navigate = useNavigate();
    return(
        <header className="App-header">
            <div className='Header-buttons'>
                <button onClick={() => navigate('/login')} className = 'header-btn btn-login'>Вход</button>
                <button onClick={() => navigate('/register')} className = 'header-btn btn-register'>Регистрация</button>
            </div>
        </header>
    )
}

