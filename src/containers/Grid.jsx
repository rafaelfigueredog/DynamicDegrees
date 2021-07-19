import React, {useState, useRef} from 'react'; 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Course from '../components/Course'; 
import makeStyles  from '@material-ui/styles/makeStyles';
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
        paper: {
            width: 130, 
            height: 30, 
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
    
    const classes = useStyles(); 
    const courses = data.degree.courses;
    const [availableCourses, setAvailableCourses] = useState(createStateAvailable());
    const [succeedCourses, setSucceedCourses] = useState(createStateSucceed());
    const coursesConection = useRef( new Map() ) 
    
    const handleToChange = (success, course) => {
        const updateSucceedCourses = succeedCourses; 
        updateSucceedCourses[course.period][course.id] = success; 
        setSucceedCourses(updateSucceedCourses); 
        const checkUnlockCourse = (requisite) => updateSucceedCourses[requisite.period][requisite.course]; 
        course.unlock.forEach( notify => {
            const unlock = courses[notify.period][notify.course].prerequisite.every(checkUnlockCourse); 
            if ( availableCourses[notify.period][notify.course] !== unlock ) {
                const updateAvailableCourses = availableCourses; 
                updateAvailableCourses[notify.period][notify.course] = unlock;
                setAvailableCourses(updateAvailableCourses);
                
                // update the specific course  
                const { name } = courses[notify.period][notify.course]
                coursesConection.current.get(name).handleToChangeStateCourse(); 
            }
        })
    }  


     
    return (
        <div className='containerColumns' >
            {courses.map((semester, periodIndex) => 
                <div
                    className='containerCourses'   
                    key={periodIndex} 
                >
                <Paper
                    className={classes.paper}
                    elevation={1}
                > 
                    <Button variant='text' fullWidth className={classes.period} >
                        {`${periodIndex+1}º Semestre `}
                    </Button>
                </Paper>
                    {semester.map((course) => 
                        <Course 
                            key={course.name}
                            course={course}
                            onSucess={(success, course) => handleToChange(success, course)}
                            availableCourses={availableCourses} 
                            ref={referece => coursesConection.current.set(course.name, referece)}
                        />
                    )} 
                </div>
            )}
        </div>
    )
}
