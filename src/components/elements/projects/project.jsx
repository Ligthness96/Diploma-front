import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import graphIcon from '../../photos/iconGraph.png'
import Typography from '@mui/material/Typography';
import styles from './project.module.css'

export const Project = ({
    projectid,
    projectname
  }) => {


  return (
    <Card className={styles.projectsCard} onClick={() => {window.alert("Перейти")}} >
      <CardContent>
        <img className={styles.icon} src={graphIcon} alt="graph" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           {projectname}
        </Typography>
      </CardContent>
    </Card>
  );
}