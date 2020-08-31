import {FETCH_REPOS, FETCH_REPO} from '../actions/types'

//Reducer takes state from action and either returns the default state or a new copy of the state that has different values
export default (state = {}, action) => {
    switch(action.type){
        case FETCH_REPOS:
            return action.payload;
        case FETCH_REPO: 
            return action.payload;
        default:
            return state;
    }
}