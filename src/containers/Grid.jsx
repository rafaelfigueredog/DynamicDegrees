import React, {useState, useRef} from 'react'; 

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import makeStyles  from '@material-ui/styles/makeStyles';
import Typography  from '@material-ui/core/Typography';

import Course from '../components/Course'; 
import Stack from '../classes/Stack';
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
            marginTop: theme.spacing(12), 
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            flexDirection: 'row',
            width: '100%',
            margin: '5.5%'
        },

        titleColumn: {
            width: 150, 
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
            fontSize: 12,
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

    const updateSucceedMap = (course, state) => {
        const updateSucceedMap = succeedCourses; 
        updateSucceedMap[course.period][course.id] = state; 
        setSucceedCourses(updateSucceedMap); 
    } 

    const updateAvailableMap = (course, state) => {
        const updateAvailableMap = availableCourses; 
        updateAvailableMap[course.period][course.id] = state;
        setAvailableCourses(updateAvailableMap);
    }

    const checkUnlockCourse = (requisite) => { 
        return succeedCourses[requisite.period][requisite.id]; 
    }
    
    const unlockConnections = (course, state) => {
        updateSucceedMap(course, state) 
        const notificationsList = course.unlock; 
        for (let notify of notificationsList)  {
            // This line check if all prerequisites are ok. 
            const unlock = courses[notify.period][notify.id].prerequisite.every(checkUnlockCourse); 
            if ( availableCourses[notify.period][notify.id] !== unlock ) {
                const updateAvailableCourses = availableCourses; 
                updateAvailableCourses[notify.period][notify.id] = unlock;
                setAvailableCourses(updateAvailableCourses);
                const { name } = courses[notify.period][notify.id]
                coursesConection.current.get(name).handleToChangeState(true, false); 
            }
        }        
    }

    const lockConnections = (course, state) => {

        // update current state of root notes 
        updateSucceedMap(course, state) 
    
        // get stack for connections 
        let connections = new Stack()
        connections.push(course)

        while ( !connections.isEmpty() ) {

            let connection = connections.top(); 
            connections.pop(); 

            if (connection.name !== course.name) {
                updateSucceedMap(connection, state); 
                updateAvailableMap(connection, state); 
                coursesConection.current.get(connection.name).handleToChangeState(false, false); 
            } 

            const notificationsList = connection.unlock; 
            for (let notify of notificationsList)  {
                connections.push(courses[notify.period][notify.id]);
            }
        }
    }


    const handleToChange = (state, course) => {
        state ? unlockConnections(course, state) : lockConnections(course, state)
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
                            onChange={(state, course) => handleToChange(state, course)}
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
