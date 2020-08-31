import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import githubReducer from './githubReducer'

export default combineReducers({
    github: githubReducer,
    form: formReducer
})