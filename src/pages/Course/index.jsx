import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import makeStyles  from '@material-ui/styles/makeStyles';

import Header from '../../components/Header';
import Grid from '../../containers/Grid';
import Footer from '../../components/Footer'

import courses from '../../data'; 

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start' 
        }
    });
})

export default function Course({paletteType, setPaletteType}) {
    
    const classes = useStyles();
    const { id } = useParams(); 
    const [course, setCourse] = useState(courses[id]); 
    const { name: courseName } = course;  

    
    useEffect(() => {
        setCourse(courses[id]); 
    }, [id])

    

    return (
        <div className={classes.root}>
            <Header 
                paletteType={paletteType} 
                setPaletteType={setPaletteType} 
                title={courseName}
            />
            <Grid id={id} course={course} />
            <Footer />
        </div>
    )
}
