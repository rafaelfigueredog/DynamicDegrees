import React, { useRef, useState } from 'react';
import { recoverSucceed } from '../services';
import { recoverAvailable } from '../services';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Course from '../components/Course';
import Stack from '../classes/Stack';
import OptativeModal from '../components/Optative';

import useStyles from './styles';
import '../index.css';

export default function Grid({ id, course, updateProgress }) {
    const classes = useStyles();
    const references = useRef(new Map());
    const { components, semesters } = course; // Incluindo optatives do curso
    const [availableCourses, setAvailableCourses] = useState(recoverAvailable(id, components, semesters));
    const [succeedCourses, setSucceedCourses] = useState(recoverSucceed(id, components, semesters));
    const [isOptativeModalOpen, setOptativeModalOpen] = useState(false);

    function updateLocalStorage() {
        localStorage.setItem(`succeed:${id}`, JSON.stringify(succeedCourses));
        localStorage.setItem(`available:${id}`, JSON.stringify(availableCourses));
    }

    const resetProgress = () => {
        localStorage.removeItem(`succeed:${id}`);
        localStorage.removeItem(`available:${id}`);
        localStorage.setItem(`progress:${id}`, 0);

        const resetSucceed = components.map((semester) => semester.map(() => false));
        const resetAvailable = components.map((semester) =>
            semester.map((course) => course.prerequisite.length === 0)
        );

        setSucceedCourses(resetSucceed);
        setAvailableCourses(resetAvailable);

        components.forEach((semester) => {
            semester.forEach((course) => {
                const { name } = course;
                const ref = references.current.get(name);
                const isAvailable = course.prerequisite.length === 0;
                if (ref && typeof ref.setState === 'function') {
                    ref.setState(isAvailable, false);
                }
            });
        });

        updateProgress(resetSucceed);
    };

    const openOptativeModal = () => setOptativeModalOpen(true);
    const closeOptativeModal = () => setOptativeModalOpen(false);

    const updateSucceedMap = (course, state) => {
        const updateSucceedMap = succeedCourses;
        updateSucceedMap[course.period][course.id] = state;
        updateProgress(updateSucceedMap);
        setSucceedCourses(updateSucceedMap);
    };

    const checkUnlockCourse = (requisite) => {
        return succeedCourses[requisite.period][requisite.id];
    };

    const updateAvailableCourses = (course) => {
        const unlock = components[course.period][course.id].prerequisite.every(checkUnlockCourse);
        if (availableCourses[course.period][course.id] !== unlock) {
            const updateAvailableCourses = availableCourses;
            updateAvailableCourses[course.period][course.id] = unlock;
            setAvailableCourses(updateAvailableCourses);
            const { name } = components[course.period][course.id];
            const active = succeedCourses[course.period][course.id];
            references.current.get(name).setState(unlock, active);
        }
    };

    const unlockConnections = (course) => {
        updateSucceedMap(course, true);

        let connections = new Stack();
        connections.push(course);

        while (!connections.isEmpty()) {
            let connection = connections.top();
            connections.pop();

            if (connection.name !== course.name) {
                updateSucceedMap(connection, true);
                for (let toUnlock of connection.unlock) {
                    updateAvailableCourses(toUnlock);
                }
                references.current.get(connection.name).setState(true, true);
            }

            for (let notify of connection.prerequisite) {
                connections.push(components[notify.period][notify.id]);
            }
        }

        for (let toUnlock of course.unlock) {
            updateAvailableCourses(toUnlock);
        }
    };

    const lockConnections = (course) => {
        updateSucceedMap(course, false);

        let connections = new Stack();
        connections.push(course);

        while (!connections.isEmpty()) {
            let connection = connections.top();
            connections.pop();

            if (connection.name !== course.name) {
                updateSucceedMap(connection, false);
                references.current.get(connection.name).setState(false, false);
                updateAvailableCourses(connection);
            }

            for (let notify of connection.unlock) {
                connections.push(components[notify.period][notify.id]);
            }
        }
    };

    const handleToChange = (state, course) => {
        state ? unlockConnections(course) : lockConnections(course);
        updateLocalStorage();
    };

    const handleSemester = (semester) => {
        const state = succeedCourses[semester].every((state) => state);
        for (let course of components[semester]) {
            const available = () => (!state ? !state : availableCourses[course.period][course.id]);
            references.current.get(course.name).setState(available, !state);
            handleToChange(!state, course);
        }
    };

    return (
        <>
            {/* Botão de Resetar Progresso fora da grade */}
            <div className={classes.resetButtonContainer}>
                <Button
                    className={classes.resetButton}
                    variant="contained"
                    color="secondary"
                    onClick={resetProgress}
                >
                    Resetar Progresso
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={openOptativeModal}
                >
                    Ver Optativas Possíveis
                </Button>
            </div>

            {/* Modal de Optativas */}
            <OptativeModal
                open={isOptativeModalOpen}
                handleClose={closeOptativeModal}
                optatives={course.optatives || []}
            />

            {/* Grade Curricular */}
            <div className={classes.root}>
                {components &&
                    availableCourses &&
                    succeedCourses &&
                    components.map((semester, period) => (
                        <div className="containerCourses" key={period}>
                            <Paper className={classes.titleColumn} elevation={1}>
                                <Button
                                    variant="text"
                                    fullWidth
                                    className={classes.period}
                                    onClick={() => handleSemester(period)}
                                >
                                    <Typography variant="inherit" color="textSecondary">
                                        {`${period + 1}º Semestre `}
                                    </Typography>
                                </Button>
                            </Paper>
                            {semester.map((course) => (
                                <Course
                                    key={course.name}
                                    course={course}
                                    disable={availableCourses[course.period][course.id]}
                                    onChange={(state, course) => handleToChange(state, course)}
                                    status={succeedCourses[course.period][course.id]}
                                    ref={(referece) => references.current.set(course.name, referece)}
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </>
    );
}