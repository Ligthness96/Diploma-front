import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import joinIcon from '../../photos/iconJoin.png'
import Typography from '@mui/material/Typography';
import styles from './project.module.css'

export const JoinProject = ({action}) => {

  return (
    <Card className={styles.projectsCard} onClick={action}>
      <CardContent>
        <img className={styles.icon} src={joinIcon} alt="join project" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           Присоединиться к проекту
        </Typography>
      </CardContent>
    </Card>
  );
}