import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Button from '@material-ui/core/Button'
import makeStyles  from '@material-ui/styles/makeStyles'
import '../../index.css'

const useStyles = makeStyles((theme, success) => {
    return ({
        course: {
            width: 132, 
            height: 70, 
            textTransform: 'none',
            fontSize: 10,
            margin: 5, 
        }
    });
})



const Course = forwardRef(({course, onSucess}, ref) => {
    
    const classes = useStyles();      
    const [success, setSuccess] = useState(false);
    const [available, setAvailable] = useState(course.prerequisite.length === 0); 

    useImperativeHandle(ref, () => ({
        handleToChangeStateCourse() {
          if (available && success) {
            setSuccess(false);
          }
          setAvailable(!available);
        }
    }));

    return (
        <Button 
            className={classes.course}
            disabled={!available}
            color={success? "primary" : "default" }
            onClick={() => {
                const change = !success; 
                setSuccess(change); 
                onSucess(change, course);
            }}
            variant={success? 'contained' : 'outlined'}
            >
                {course.name} 
        </Button>
    )
});

export default Course; 