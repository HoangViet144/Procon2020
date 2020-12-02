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