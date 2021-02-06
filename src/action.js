import {db} from './firebase'
export const getProjects=(projects)=>{

    return (dispatch)=>{

        dispatch({
            type:'GET_PROJECTS',
            payload:projects
        })

    }

}



