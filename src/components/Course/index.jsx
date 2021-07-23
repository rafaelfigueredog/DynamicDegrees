import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Button from '@material-ui/core/Button'
import makeStyles  from '@material-ui/styles/makeStyles'
import Typography  from '@material-ui/core/Typography';

import '../../index.css'
 
const useStyles = makeStyles((theme, Active) => {
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



const Course = forwardRef(({course, onChange, status}, ref) => {
    
    const classes = useStyles();      
    const [active, setActive] = useState(status);

    useImperativeHandle(ref, () => ({ 
        setState(state) {
            setActive(state)
        }
    }));

    return (
        <Button 
            className={classes.course}
            color={active? 'primary' : 'secondary' }
            onClick={() => {
                const update = !active
                setActive(update)
                onChange(update, course)
            }}
            variant='contained'
        >
            <Typography 
                className={classes.text} 
                variant='caption'
                align='left' 
                color='textPrimary' 
            >
                {course.name} 
            </Typography>
        </Button>
    )
});

export default Course; 