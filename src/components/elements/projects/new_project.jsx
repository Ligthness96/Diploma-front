import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import addIcon from '../../photos/iconAdd.png'
import Typography from '@mui/material/Typography';
import styles from './project.module.css'

export const NewProject = ({action}) => {

  return (
    <Card className={styles.projectsCard} onClick={action}>
      <CardContent>
        <img className={styles.icon} src={addIcon} alt="add project" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           Создать новый проект
        </Typography>
      </CardContent>
    </Card>
  );
}