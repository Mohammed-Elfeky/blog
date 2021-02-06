import { combineReducers } from 'redux'
import Main from './mainReducer'
import authReducer from './auth'

export default combineReducers({
    main: Main,
    authReducer 
})