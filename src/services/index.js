
export const recoveredSucceed = (id) => { 
    return JSON.parse(localStorage.getItem(`succeed:${id}`)) 
}

export const recoveredAvailable = (id) =>  { 
    return JSON.parse(localStorage.getItem(`available:${id}`))
}

export const createStateAvailable = (courses, semesters) => {
    const availableState = []; 
    for (let i = 0; i < semesters; i++) {
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

export const createStateSucceed = (courses, semesters) => {
    const succeedState = []; 
    for (let i = 0; i < semesters; i++) {
        succeedState.push([]); 
    }
    

    courses.forEach((period, index) => {
        period.forEach(course => {
            succeedState[index].push(false);
        });
    });

    return succeedState; 
}

export const recoverAvailable = (id, components, semesters) => {
    if (recoveredAvailable(id) && recoveredSucceed(id)) {
        return recoveredAvailable(id); 
    }
    return createStateAvailable(components, semesters); 
}

export const recoverSucceed = (id, components, semesters) => {
    if (recoveredAvailable(id) && recoveredSucceed(id)) {
        return recoveredSucceed(id); 
    }
    return createStateSucceed(components, semesters); 
}