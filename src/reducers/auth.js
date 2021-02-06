const initialState={
    user:null,
    signUpErorr:null,
    signInErorr:null
}
export default (state = initialState, action )=>{

    switch(action.type){

        case 'CHANGE_USER_STATE':
            
        return {
            ...state,
            user:action.payload
        }

        case 'SIGNUP_ERROR':
            
        return {
            ...state,
            signUpErorr:action.err.message
        }

        case 'SIGNUP_SUCCESS':
            
        return {
            ...state,
            signUpErorr:null
        }

        case 'SIGNIN_SUCCESS':
            
        return {
            ...state,
            signInErorr:null
        }

        case 'SIGNIN_ERORR':
            
        return {
            ...state,
            signInErorr:action.err.message
        }



        default:
        return state
    }

    
}