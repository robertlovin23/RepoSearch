import {FETCH_REPOS, FETCH_REPO} from '../actions/types'

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