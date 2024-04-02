import { Typography } from '@mui/material';
import react, { useState } from 'react';


export default function Graph({show}) {

    // const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
    // const showCTF = () => {setShowCreateTaskForm(true)}
    // const hideCTF = () => {setShowCreateTaskForm(false)}

    if(show) { 
        return(
            <>
                {/* <CreateTaskForm show={showCreateTaskForm} onClose={hideCTF}/> */}
            <Typography variant="h2">
                Граф
            </Typography>
            </>
        ) 
    }
}