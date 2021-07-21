import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Button from '@material-ui/core/Button'
import makeStyles  from '@material-ui/styles/makeStyles'
import Typography  from '@material-ui/core/Typography';

import '../../index.css'
 
const useStyles = makeStyles((theme, success) => {
    return ({
        course: {
            width: 150, 
            height: 75, 
            padding: 2.5, 
            textTransform: 'none',
            margin: 5, 
        }, 
        text: {
            width: '90%',
            textAlign: 'left',
        }
    });
})



const Course = forwardRef(({course, starterAvailable, starterSucceed, onChange}, ref) => {
    
    const classes = useStyles();      
    const [success, setSuccess] = useState(starterSucceed);
    const [available, setAvailable] = useState(starterAvailable); 

    useImperativeHandle(ref, () => ({ 
        handleToChangeState(availableUpdate, successUpdate) {
          setSuccess(successUpdate); 
          setAvailable(availableUpdate); 
        }
    }));

    return (
        <Button 
            className={classes.course}
            disabled={!available}
            color={success? 'primary' : 'secondary' }
            onClick={() => {
                const update = !success
                setSuccess(update)
                onChange(update, course)
            }}
            variant='contained'
        >
            <Typography 
                className={classes.text} 
                variant='caption'
                align='left' 
                color={ success ? 'textPrimary' : 'textSecondary' } 
            >
                {course.name} 
            </Typography>
        </Button>
    )
});

export default Course; 