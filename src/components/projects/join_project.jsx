import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import joinIcon from '../photos/iconJoin.png'
import Typography from '@mui/material/Typography';
import styles from './project.css'

export const JoinProject = () => {

  return (
    <Card className="project-card" onClick={() => {window.alert("Присоединиться к проекту")}}>
      <CardContent>
        <img className='icon icon-add' src={joinIcon} alt="add project" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           Присоединиться к проекту
        </Typography>
      </CardContent>
    </Card>
  );
}