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
        case actionTypes.UPDATE_AGENT_ACTION:
            let newAgentAction = [...state.agentAction]
            for (let ele of newAgentAction) {
                if (ele.agentID == action.payload.agentID) {
                    ele.dx = action.payload.dx
                    ele.dy = action.payload.dy
                    ele.type = action.payload.type
                }
            }
            console.log(newAgentAction)
            return {
                ...state,
                agentAction: [
                    ...newAgentAction
                ]
            }
    }
    return state;
};

export default reducer;