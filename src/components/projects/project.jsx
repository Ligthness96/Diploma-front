import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import graphIcon from '../photos/iconGraph.png'
import Typography from '@mui/material/Typography';
import styles from './project.css'

export const Project = ({
    _id,
    name
  }) => {


  return (
    <Card className="project-card" onClick={() => {window.alert("Перейти")}} >
      <CardContent>
        <img className='icon icon-graph' src={graphIcon} alt="graph" />
        <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
           {name}
        </Typography>
      </CardContent>
    </Card>
  );
}