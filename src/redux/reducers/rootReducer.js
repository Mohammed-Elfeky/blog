import { combineReducers } from 'redux'
import databaseReducer from './databaseReducer'
import authReducer from './authReducer'

export default combineReducers({
    databaseReducer,
    authReducer 
})