import * as actionTypes from './actiontype';

const initialState = {
  sendState:false,
  brain:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BOARD:
            return {
                ...state,
                matchesInfo: action.payload
            }
        case actionTypes.INFO_BOARD:
            return {
                ...state,
                matchInfo: {
                    ...action.payload,
                    startedAtUnixTime: Date.now()
                }
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
            return {
                ...state,
                agentAction: [
                    ...newAgentAction
                ]
            }
        case actionTypes.SEND_STATE:
            return{
              ...state,
              sendState: action.payload
            }
        case actionTypes.BRAIN:
            return {
              ...state,
              brain: action.payload
            }
    }
    return state;
};

export default reducer;