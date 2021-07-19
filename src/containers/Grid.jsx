import React, {useState, useRef} from 'react'; 

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import makeStyles  from '@material-ui/styles/makeStyles';
import Typography  from '@material-ui/core/Typography';

import Course from '../components/Course'; 
import data from '../data/data.json' 
import '../index.css'

const createStateAvailable = () => {
    const courses = data.degree.courses; 
    const availableState = []; 
    for (let i = 0; i < data.degree.semesters; i++) {
        availableState.push([]); 
    } 
    courses.forEach((period, index) => {
        period.forEach(course => {
            const prerequisite = course.prerequisite; 
            const state = prerequisite.length === 0? true : false 
            availableState[index].push(state);
        });
    });
    return availableState; 
}

const createStateSucceed = () => {
    const courses = data.degree.courses; 
    const succeedState = []; 
    for (let i = 0; i < data.degree.semesters; i++) {
        succeedState.push([]); 
    } 
    courses.forEach((period, index) => {
        period.forEach(course => {
            succeedState[index].push(false);
        });
    });
    return succeedState; 
}

const useStyles = makeStyles((theme) => {
    return ({

        root: {
            marginTop: theme.spacing(7), 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'flex-start', 
            flexDirection: 'row',
            width: '100%'
        },

        titleColumn: {
            width: 130, 
            height: 30 , 
            margin: 5, 
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: "column", 
        }, 

        period: {
            width: 130, 
            height: 30, 
            textTransform: 'none',
            fontSize: 10,
            margin: 5, 
            fontWeight: 'bold', 
        }
    });
})
 
export default function Grid() {

    const initAvailable = () => {
        const starterAvailable = createStateAvailable(); 
        return JSON.parse(localStorage.getItem('available')) || starterAvailable; 
    }

    const initSucceed = () => {
        const starterSucceed = createStateSucceed(); 
        return JSON.parse(localStorage.getItem('succeed')) || starterSucceed; 
    }
    
    const classes = useStyles(); 
    const courses = data.degree.courses;
    const [availableCourses, setAvailableCourses] = useState(initAvailable());
    const [succeedCourses, setSucceedCourses] = useState(initSucceed());
    const coursesConection = useRef( new Map() ) 

    const updateLocalStorage = () => {
        localStorage.setItem('available', JSON.stringify(availableCourses)); 
        localStorage.setItem('succeed', JSON.stringify(succeedCourses));
    }
    
    const handleToChange = (success, course)    => {
        const updateSucceedCourses = succeedCourses; 
        updateSucceedCourses[course.period][course.id] = success; 
        setSucceedCourses(updateSucceedCourses); 
        const checkUnlockCourse = (requisite) => updateSucceedCourses[requisite.period][requisite.id]; 
        course.unlock.forEach( notify => {
            const unlock = courses[notify.period][notify.id].prerequisite.every(checkUnlockCourse); 
            if ( availableCourses[notify.period][notify.id] !== unlock ) {
                const updateAvailableCourses = availableCourses; 
                updateAvailableCourses[notify.period][notify.id] = unlock;
                setAvailableCourses(updateAvailableCourses);
                
                // update the specific course  
                const { name } = courses[notify.period][notify.id]
                coursesConection.current.get(name).handleToChangeStateCourse(); 
            }
        })
        updateLocalStorage(); 
    }  


     
    return (
        <div className={classes.root} >
            {courses.map((semester, periodIndex) => 
                <div
                    className='containerCourses'   
                    key={periodIndex} 
                >
                <Paper
                    className={classes.titleColumn}
                    elevation={1}
                > 
                    <Button 
                        variant='text' 
                        fullWidth 
                        className={classes.period}  
                    >
                        <Typography variant='caption' color='textSecondary' >
                            {`${periodIndex+1}º Semestre `}
                        </Typography>
                    </Button>
                </Paper>
                    {semester.map((course) => 
                        
                        <Course 
                            key={course.name}
                            course={course}
                            onSucess={(success, course) => handleToChange(success, course)}
                            starterAvailable={availableCourses[course.period][course.id] }
                            starterSucceed={succeedCourses[course.period][course.id]}
                            ref={referece => coursesConection.current.set(course.name, referece)}
                        />
                    )} 
                </div>
            )}
        </div>
    )
}
