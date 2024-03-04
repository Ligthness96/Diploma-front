import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import addIcon from '../photos/iconAdd.png'
import Typography from '@mui/material/Typography';
import styles from './project.css'

export const NewProject = () => {

  return (
    <Card className="project-card" onClick={() => {window.alert("создать проект")}}>
      <CardContent>
        <img className='icon icon-add' src={addIcon} alt="add project" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           Создать новый проект
        </Typography>
      </CardContent>
    </Card>
  );
}