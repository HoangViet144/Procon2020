import * as actionTypes from './actiontype';

export const initBoard = (matchId, agentName, teamId, turn, intervalTime, turnTime) => (dispatch) => {
    dispatch({
        type: actionTypes.INIT_BOARD,
        payload: {
            matchId: matchId,
            agentName: agentName,
            teamId: teamId,
            turn: turn,
            intervalTime: intervalTime,
            turnTime: turnTime
        }
    })
}
export const updateAgentAction = (curr, next, type) => (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_AGENT_ACTION,
        payload: {
            agentID: curr.id,
            dx: next.x - curr.x,
            dy: next.y - curr.y,
            type: type
        }
    })
}
export const setAgentAction = (action) => dispatch => {
    dispatch({
        type: actionTypes.SET_AGENT_ACTION,
        payload: action
    })
}
export const setSendState = (action) =>dispatch=>{
    dispatch({
        type: actionTypes.SEND_STATE,
        payload: action
    })
}
export const setBrain = (action) =>dispatch=>{
    dispatch({
        type:actionTypes.BRAIN,
        payload:action
    })
}