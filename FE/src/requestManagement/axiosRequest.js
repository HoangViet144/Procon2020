import axios from 'axios'
import { TOKEN, BASE_URL } from '../config'
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
                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches',
                        time: Date.now(),
                        body: {},
                        response: response
                    })
                };
                axios(anotherConfig)
            })
            .catch(error => {
                console.log(error);
                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches',
                        time: Date.now(),
                        body: {},
                        response: error
                    })
                };
                axios(anotherConfig)
            });
    }
    catch (er) {
        console.log(er)
        alert("er")
    }
}
export const getMatchesById = (id, teamID) => async dispatch => {
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
                let agentInfo = {}
                if (response.data.teams[0].teamID === teamID)
                    agentInfo = response.data.teams[0].agents
                if (response.data.teams[1].teamID === teamID)
                    agentInfo = response.data.teams[1].agents
                let agentAction = []
                for (let id in agentInfo) {
                    agentAction.push({
                        agentID: agentInfo[id].agentID,
                        curX: agentInfo[id].x,
                        curY: agentInfo[id].y,
                        dx: 0,
                        dy: 0,
                        type: 'stay'
                    })
                }
                dispatch({
                    type: actionTypes.INFO_BOARD,
                    payload: {
                        ...response.data
                    }
                })
                dispatch({
                    type: actionTypes.SET_AGENT_ACTION,
                    payload: agentAction
                })

                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches/' + id.toString(),
                        time: Date.now(),
                        body: {},
                        response: response
                    })
                }
                axios(anotherConfig)
            })
            .catch(error => {
                console.log(error);
                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches/' + id.toString(),
                        time: Date.now(),
                        body: {},
                        response: error
                    })
                }
                axios(anotherConfig)
            });

    }
    catch (e) {
        console.log(e)
    }
}
export const sendAction = (agentAction, id) => {
    console.log("trigger send")
    try {
        let body = { actions: [], token: TOKEN }
        for (let ele of agentAction) {
            body.actions.push({
                agentID: ele.agentID,
                dx: ele.dx,
                dy: ele.dy,
                type: ele.type
            })
        }
        var config = {
            method: 'post',
            url: BASE_URL + '/matches/' + id.toString() + "/action",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(body)
        };
        axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches/' + id.toString() + "/action",
                        time: Date.now(),
                        body: body,
                        response: response
                    })
                };
                axios(anotherConfig)
            })
            .catch(error => {
                console.log(error);
                var anotherConfig = {
                    method: 'post',
                    url: 'http://localhost:9000/log/create',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        url: BASE_URL + '/matches/' + id.toString() + "/action",
                        time: Date.now(),
                        body: body,
                        response: error
                    })
                };
                axios(anotherConfig)
            });
    }
    catch (e) {
        console.log(e)
    }
}
