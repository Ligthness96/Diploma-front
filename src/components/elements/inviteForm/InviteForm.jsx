import React, { useState, useEffect, useRef } from "react";
import styles from './InviteForm.module.css'
import { useForm } from 'react-hook-form'
import { TextField, Typography, Button, InputAdornment } from '@mui/material';
import { useDispatch } from "react-redux";
import { createInvite } from "../../../redux/slices/invites";
import CopyToClipboard from "react-copy-to-clipboard";


const InviteForm = ({show, onConfirm, onCancel, onClose}) => {
    const dispatch = useDispatch()
    const [code, setCode] = useState('');
    const [copied, setCopied] = useState(false);
    const modalRef = useRef(null)

    const onCopy = React.useCallback(() => {
    setCopied(true);
    }, [])

    var textCode='';
    const createCode = async () => {
        var keys = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        
		for(var i=0; i<10; i++){
			textCode+=keys.charAt(Math.floor(Math.random()*keys.length));
		}
        const data = await dispatch(createInvite({code: textCode, projectid: window.localStorage.getItem('projectid')}))
        
        if (!data.payload) {
            alert('Не удалось создать код приглашения')
        } else {
            setCode(textCode)
            alert('Код пришлашения создан')
        }
    }
    useEffect(() => {}, [textCode])

    const closeModalOnClickOut = (e) => {
        if (show && e.target && modalRef.current && !modalRef.current.contains(e.target) && onClose) {
            onClose()
            setCopied(false);
            setCode('')
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
                <div ref={modalRef} className={styles.modalContent}>
                    <Typography variant="h4" className={styles.text}>
                        Новое приглашение
                    </Typography>
                    <TextField
                        className={styles.textField} 
                        value={code}
                        label='Код приглашения' 
                        foc
                        contentEditable='false'
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                    <CopyToClipboard onCopy={onCopy} text={code}>
                                        <Button style={{width: 90}} variant="outlined">{copied ? <span style={{color: 'green', fontSize: 10}}>Скопировано!</span> : <span style={{color: 'blue', fontSize: 10}}>Скопировать</span>}</Button>
                                    </CopyToClipboard>
                              </InputAdornment>
                            ),
                          }}
                    />
                    <button className={styles.button} onClick={createCode} type="submit">Создать</button>
                </div>
            </div>
        )
    }
}

export default InviteForm