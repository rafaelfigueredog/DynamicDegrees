import computation from './computacao.json'; 
import edifices from './edificacoes.json'; 
import telematics from './telematics.json' 
import engcivil from './eng-civil.json' 
 
const courses = {

    1: {
        name: computation.name,
        semesters: computation.semesters, 
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
        components: engcivil.components, 
        workTime: 3891
    },
    /*

    4: {
        name: edifices.name,
        semesters: edifices.semesters, 
        components: edifices.components, 
    },

    5: {
        name: edifices.name,
        semesters: edifices.semesters, 
        components: edifices.components, 
    }, */

    6: {
        name: telematics.name,
        semesters: telematics.semesters, 
        components: telematics.components, 
        workTime: 2839
    },
}


export { courses }
export default courses; 