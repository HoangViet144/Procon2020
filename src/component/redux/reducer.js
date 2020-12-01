import * as actionTypes from './actiontype';

const initialState = {
    board: {
        te: "hi",
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BOARD:
            console.log("call")
            return {
                ...state,
                matchId: action.payload.matchId,
                agentName: action.payload.agentName,
                teamId: action.payload.teamId,
                turn: action.payload.turn,
                intervalTime: action.payload.intervalTime,
                turnTime: action.payload.turnTime
            }
    }
    return state;
};

export default reducer;