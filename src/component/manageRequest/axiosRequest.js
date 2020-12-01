import axios from 'axios'
import { initBoard } from '../redux/actions'
import { TOKEN, BASE_URL } from '../../config'
import { INIT_BOARD } from '../redux/actiontype'
import connect from 'react-redux'

export const getMatches = () => {
    var data = JSON.stringify({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoic3BhcnRhIiwiaWF0IjoxNjA2Nzk3MzY1LCJleHAiOjE2MDY4ODM3NjV9.0ooXwNJ41dQb869Qe4si2pccYQet6B6I6mqrbfKaYs0" });

    var config = {
        method: 'get',
        url: 'http://112.137.129.202:8009/matches',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    // axios.post('/matches', { token: TOKEN })
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         alert(error)
    //         const returnInfo = {
    //             id: 1,
    //             intervalMillis: 5000,
    //             matchTo: "TeamA",
    //             teamID: 10,
    //             turnMillis: 10000,
    //             turns: 45
    //         }
    //         console.log(returnInfo)
    //         initBoard(returnInfo.id, returnInfo.matchTo, returnInfo.teamID, returnInfo.turns, returnInfo.intervalMillis, returnInfo.turnMillis)
    //     })
}

export const getUsers = () => async dispatch => {

    try {
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        dispatch({
            type: INIT_BOARD,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: INIT_BOARD,
            payload: console.log(e),
        })
    }

}