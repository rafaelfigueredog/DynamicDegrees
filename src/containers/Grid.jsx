import React, {useState, useRef} from 'react'; 

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import makeStyles  from '@material-ui/styles/makeStyles';
import Typography  from '@material-ui/core/Typography';

import Course from '../components/Course'; 
import Stack from '../classes/Stack';
import data from '../data/data.json' 
import '../index.css'

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

    const recover = () => {
        const starterSucceed = createStateSucceed(); 
        return JSON.parse(localStorage.getItem('succeed')) || starterSucceed; 
    }
    
    const classes = useStyles(); 
    const courses = data.degree.courses;
    const [succeedCourses, setSucceedCourses] = useState(recover());
    const references = useRef( new Map() ) 

    const updateLocalStorage = () => {
        localStorage.setItem('succeed', JSON.stringify(succeedCourses));
    }

    const updateSucceedMap = (course, state) => {
        const updateSucceedMap = succeedCourses; 
        updateSucceedMap[course.period][course.id] = state; 
        setSucceedCourses(updateSucceedMap); 
    } 

    const lockConnections = (course, state) => {
        updateSucceedMap(course, state) 
        let connections = new Stack()
        connections.push(course)
        while ( !connections.isEmpty() ) {
            let connection = connections.top(); 
            connections.pop(); 
            if (connection.name !== course.name) {
                updateSucceedMap(connection, state); 
                references.current.get(connection.name).setState(state); 
            } 
            const notificationsList = connection.unlock; 
            for (let notify of notificationsList)  {
                connections.push(courses[notify.period][notify.id]);
            }
        }
    }

    const unlockPreConnections = (course, state) => {
        updateSucceedMap(course, state) 
        let connections = new Stack()
        connections.push(course)
        while ( !connections.isEmpty() ) {
            let connection = connections.top(); 
            connections.pop(); 
            if (connection.name !== course.name) {
                updateSucceedMap(connection, state); 
                references.current.get(connection.name).setState(state); 
            }
            const notificationsList = connection.prerequisite; 
            for (let notify of notificationsList)  {
                connections.push(courses[notify.period][notify.id]);
            }
        }
    }

    const activate = (course, state) => {
        unlockPreConnections(course, state)
    }

    const deactivate = (course, state) => {
        lockConnections(course, state)
    }

    const handleToChange = (state, course) => {
        state ? activate(course, state) : deactivate(course, state)
        updateLocalStorage(); 
    }  

    
    const handleSemester = (semester) => {
        const state = succeedCourses[semester].every(state => state)     
        for (let course of courses[semester]) {
            references.current.get(course.name).setState(!state);
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
                            onChange={(state, course) => handleToChange(state, course)}
                            starterSucceed={succeedCourses[course.period][course.id]}
                            ref={referece => references.current.set(course.name, referece)}
                        />
                    )} 
                </div>
            )}
        </div>
    )
}
