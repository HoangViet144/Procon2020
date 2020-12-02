import axios from 'axios'
import { initBoard } from '../redux/actions'
import { TOKEN, BASE_URL } from '../config'
import { INIT_BOARD } from '../redux/actiontype'
import * as actionTypes from '../redux/actiontype';

export const getMatches = () => async dispatch => {
    try {
        var config = {
            method: 'get',
            url: BASE_URL + '/matches',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                token: TOKEN
            }
        };
        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                dispatch({
                    type: actionTypes.INIT_BOARD,
                    payload: {
                        ...response.data
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (er) {
        console.log(er)
        alert("er")
    }
}
export const getMatchesById = (id) => async dispatch => {
    try {
        console.log(id)
        var config = {
            method: 'get',
            url: BASE_URL + '/matches/' + id.toString(),
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                token: TOKEN
            }
        };
        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                dispatch({
                    type: actionTypes.INFO_BOARD,
                    payload: {
                        ...response.data
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
        return
    }
    catch (e) {
        console.log(e)
    }
}
