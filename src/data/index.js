import computation from './computacao.json'; 
import edifices from './edificacoes.json'; 
import telematics from './telematics.json' 
import engcivil from './eng-civil.json' 
import math from './math.json' 
import physics from './physics.json'

const courses = {

    1: {
        name: computation.name,
        semesters: computation.semesters, 
        optatives: computation.optatives,
        components: computation.components, 
        workTime: 3309
    },


    2: {
        name: edifices.name,
        semesters: edifices.semesters, 
        components: edifices.components, 
        workTime: 3019
    },


    3: {
        name: engcivil.name,
        semesters: engcivil.semesters, 
        optatives: engcivil.optatives,
        components: engcivil.components, 
        workTime: 4088
    },
    

    4: {
        name: math.name,
        semesters: math.semesters, 
        optatives: math.optatives,
        components: math.components, 
        workTime: 3070
    },

    
    5: {
        name: physics.name,
        semesters: physics.semesters, 
        optatives: physics.optatives,
        components: physics.components,
        workTime: 3117
    },

    6: {
        name: telematics.name,
        semesters: telematics.semesters, 
        optatives: telematics.optatives,
        components: telematics.components, 
        workTime: 2839
    },
}


export { courses }
export default courses; 