import React, {useState, useRef} from 'react'; 

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import makeStyles  from '@material-ui/styles/makeStyles';
import Typography  from '@material-ui/core/Typography';

import Course from '../components/Course'; 
import Stack from '../classes/Stack';
import data from '../data/data.json' 
import '../index.css'

const recoveredAvailable =  JSON.parse(localStorage.getItem('available')); 
const recoveredSucceed = JSON.parse(localStorage.getItem('succeed')); 

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

const recoverAvailable = () => {
    if (recoveredAvailable && recoveredSucceed) {
        return recoveredAvailable; 
    }
    return createStateAvailable(); 
}

const recoverSucceed = () => {
    if (recoveredAvailable && recoveredSucceed) {
        return recoveredSucceed; 
    }
    return createStateSucceed(); 
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
            margin: '1%'
        },

        titleColumn: {
            width: 140, 
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
            margin: 5, 
        }
    });
})

export default function Grid() {
    
    const classes = useStyles(); 
    const courses = data.degree.courses;
    const [availableCourses, setAvailableCourses] = useState(recoverAvailable());
    const [succeedCourses, setSucceedCourses] = useState(recoverSucceed());
    const references = useRef( new Map() ) 

    const updateLocalStorage = () => {
        localStorage.setItem('succeed', JSON.stringify(succeedCourses));
        localStorage.setItem('available', JSON.stringify(availableCourses));
    }
   
    const updateSucceedMap = (course, state) => {
        const updateSucceedMap = succeedCourses; 
        updateSucceedMap[course.period][course.id] = state; 
        setSucceedCourses(updateSucceedMap); 
    } 


    const checkUnlockCourse = (requisite) => { 
        return succeedCourses[requisite.period][requisite.id]; 
    }

    const updateAvailableCourses = (course) => {
        const unlock = courses[course.period][course.id].prerequisite.every(checkUnlockCourse); 
        if ( availableCourses[course.period][course.id] !== unlock ) {
            const updateAvailableCourses = availableCourses; 
            updateAvailableCourses[course.period][course.id] = unlock;
            setAvailableCourses(updateAvailableCourses);
            const { name } = courses[course.period][course.id]
            const active = succeedCourses[course.period][course.id]; 
            references.current.get(name).setState(unlock, active); 
        }
    }

    const unlockConnections = (course) => {
        
        updateSucceedMap(course, true) 

        let connections = new Stack()
        connections.push(course)

        while ( !connections.isEmpty() ) {
            
            let connection = connections.top(); 
            connections.pop(); 

            if (connection.name !== course.name) {
                updateSucceedMap(connection, true);  
                for (let toUnlock of connection.unlock) {
                    updateAvailableCourses(toUnlock); 
                }
                references.current.get(connection.name).setState(true, true);
            }
            
            for (let notify of connection.prerequisite)  {
                connections.push(courses[notify.period][notify.id]);
            }

        }

        for (let toUnlock of course.unlock)  {
            updateAvailableCourses(toUnlock); 
        }
        

    }

    const lockConnections = (course) => {
        
        updateSucceedMap(course, false) 

        let connections = new Stack()
        connections.push(course)

        while ( !connections.isEmpty() ) {

            let connection = connections.top(); 
            connections.pop(); 

            if (connection.name !== course.name) {
                updateSucceedMap(connection, false); 
                references.current.get(connection.name).setState(false, false); 
                updateAvailableCourses(connection);
            } 

            for (let notify of connection.unlock)  {
                connections.push(courses[notify.period][notify.id]);
            }

        }
    }


    const handleToChange = (state, course) => {
        state ? unlockConnections(course) : lockConnections(course)
        updateLocalStorage(); 
    }  

    
    const handleSemester = (semester) => {
        const state = succeedCourses[semester].every(state => state)     
        for (let course of courses[semester]) {
            const available = () => !state? !state : availableCourses[course.period][course.id]; 
            references.current.get(course.name).setState(available,!state);
            handleToChange(!state, course); 
        }
    }
    

    return (
        <div className={classes.root} >
            {courses.map((semester, period) => 
                <div
                    className='containerCourses'   
                    key={period} 
                >
                <Paper
                    className={classes.titleColumn}
                    elevation={1}
                > 
                    <Button 
                        variant='text' 
                        fullWidth 
                        className={classes.period} 
                        onClick={() => handleSemester(period)}
                    >
                        <Typography variant='inherit' color='textSecondary' >
                            {`${period+1}º Semestre `}
                        </Typography>
                    </Button>
                </Paper>
                    {semester.map((course) => 
                        
                        <Course 
                            key={course.name}
                            course={course}
                            disable={availableCourses[course.period][course.id]}
                            onChange={(state, course) => handleToChange(state, course)}
                            status={succeedCourses[course.period][course.id]}
                            ref={referece => references.current.set(course.name, referece)}
                        />
                    )} 
                </div>
            )}
        </div>
    )
}
