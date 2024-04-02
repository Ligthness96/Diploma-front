import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../../../../redux/slices/participants';
import { Typography, Card, Divider } from '@mui/material';
import styles from './Participants.module.css'
import InviteForm from '../../../elements/inviteForm/InviteForm';


export default function Participants({show, pr}) {
    const dispatch = useDispatch()
    const { participants } = useSelector(state => state.participants)
    const isParticipantLoading = participants.status === 'loading'

    useEffect(() => {
        dispatch(fetchParticipants({projectid:  window.localStorage.getItem("projectid")}))
    }, [show])
    
    const [showInviteForm, setShowInviteForm] = useState(false)
    const showIF = () => {setShowInviteForm(true)}
    const hideIF = () => {setShowInviteForm(false)}

    if(show) { 
        return(
        <div className={styles.content}>
            <InviteForm show={showInviteForm} onClose={hideIF}/>
            <Card className={styles.adminCard}> 
                <Typography className={styles.adminTitle} variant="h2">Владелец:  </Typography> 
                {participants.items.map((obj, index) => isParticipantLoading || !obj.admin 
                ? (<></>) 
                : (<>
                        <Typography style={{color: "#7b91b3"}} variant="h2">{obj.name}</Typography>
                    </>
                ))}
            </Card> 
            <Card className={styles.participantsCard}>  
                <div className={styles.participantsCardHeader}>
                    <Typography className={styles.participantsTitle} variant="h2">
                        Участники
                    </Typography>
                    <button onClick={showIF} className={styles.button}>Пригласить</button>
                </div>
                <Divider className='divider' orientation="horizontal" variant="middle" flexItem/>
                {participants.items.map((obj, index) => isParticipantLoading || obj.admin 
                ? (<></>) 
                : (<Typography style={{color: "#7b91b3", marginLeft: '40pt'}} variant="h2">
                        {obj.name}
                    </Typography>
                ))}
            </Card>  
        </div>
        ) 
    }
}