import axios from 'axios'
import { initBoard } from '../redux/actions'
import { TOKEN, BASE_URL } from '../../config'
import { INIT_BOARD } from '../redux/actiontype'
import * as actionTypes from '../redux/actiontype';

export const getMatches = () => async dispatch => {
    try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        const returnInfo = {
            id: 1,
            intervalMillis: 5000,
            matchTo: "TeamA",
            teamID: 10,
            turnMillis: 10000,
            turns: 45
        }
        dispatch({
            type: actionTypes.INIT_BOARD,
            payload: {
                ...returnInfo
            }
        })
        alert("get matches OK")
    }
    catch (er) {
        console.log(er)
        alert("er")
    }
}
