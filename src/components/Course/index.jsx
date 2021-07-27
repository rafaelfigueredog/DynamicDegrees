import React, {useState, forwardRef, useImperativeHandle} from 'react'

import Button from '@material-ui/core/Button'
import makeStyles  from '@material-ui/styles/makeStyles'
import Typography  from '@material-ui/core/Typography'; 

import '../../index.css'
 
const useStyles = makeStyles((theme, available) => {
    return ({
        course: {
            width: 140, 
            height: 70, 
            padding: 2.5, 
            textTransform: 'none',
            margin: 5, 
        }, 
        text: {
            width: '95%',
            textAlign: 'left',
        }
    });
})

const Course = forwardRef(({course, onChange, disable, status}, ref) => {
    
        
    const [active, setActive] = useState(status);
    const [available, setAvailable] = useState(disable); 

    useImperativeHandle(ref, () => ({ 
        setState(available, active) {
            setActive(active);
            setAvailable(available);
        }
    }));

    const handleToState = () => {
        const update = !active 
        if (!available) {
            setAvailable(true);
        }
        setActive(update);
        onChange(update, course);
    }

    const classes = useStyles(available);  

    return (
        <Button 
            className={classes.course}
            color={active? 'primary' : 'secondary'}
            onClick={() => handleToState()}
            variant={available? 'contained' : 'outlined' }
        >
            <Typography 
                className={classes.text} 
                variant='caption'
                align='left' 
                color={!available? 'textSecondary' : 'textPrimary'} 
            >
                {course.name} 
            </Typography>
        </Button>
    )
});

export default Course; 