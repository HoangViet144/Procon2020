import * as actionTypes from './actiontype';

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BOARD:
            console.log("call")
            return {
                ...state,
                matchesInfo: action.payload
            }
        case actionTypes.INFO_BOARD:
            return {
                ...state,
                matchInfo: action.payload
            }
        case actionTypes.SET_AGENT_ACTION:
            return {
                ...state,
                agentAction: action.payload
            }
    }
    return state;
};

export default reducer;