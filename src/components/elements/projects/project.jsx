import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import graphIcon from '../../photos/iconGraph.png'
import Typography from '@mui/material/Typography';
import styles from './project.module.css'
import { Link } from 'react-router-dom';

export const Project = ({
    projectid,
    projectname
  }) => {


  return (
    <Link to='/project/main' state={{id: projectid}} draggable="false" style={{textDecoration: "none"}}>
      <Card className={styles.projectsCard}>
        <CardContent>
          <img className={styles.icon} src={graphIcon} alt="graph" draggable="false"/>
          <Typography variant="h6" component="div" color="#ADB5FF" gutterBottom>
            {projectname}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}