import {FETCH_REPOS, FETCH_REPO} from '../actions/types';
import axios from 'axios';


export const fetchRepos = (formValues) => async (dispatch) => {
    const query = formValues.Search;
    const language = formValues.Language;

    console.log(query,language)

    const response = await axios.get(`/github/results/${query}/${language}`);
    
    dispatch({
        type: FETCH_REPOS,
        payload: response.data
    })
}

export const fetchRepo = (owner,name) => async (dispatch) => {
    const response = await axios.get(`/github/repository/${owner}/${name}`);

    dispatch({
        type: FETCH_REPO,
        payload: response.data
    })
}