import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Button from '@material-ui/core/Button'
import makeStyles  from '@material-ui/styles/makeStyles'
import Typography  from '@material-ui/core/Typography';
import {BsCheck} from 'react-icons/bs' 
import '../../index.css'
 
const useStyles = makeStyles((theme, success) => {
    return ({
        course: {
            width: 132, 
            height: 70, 
            textTransform: 'none',
            textAlign: 'left', 
            fontSize: 10,
            margin: 3, 
        }, 
        text: {
            width: '80%',
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
            color='primary'
            onClick={() => {
                const update = !success
                setSuccess(update)
                onChange(update, course)
            }}
            variant={success? 'contained' : 'outlined'}
            endIcon={success? <BsCheck color='#fafafa' /> : null }
        >
            <Typography className={classes.text} variant='inherit' color={success? 'textPrimary' : 'inherit' } >
                {course.name} 
            </Typography>
        </Button>
    )
});

export default Course; 