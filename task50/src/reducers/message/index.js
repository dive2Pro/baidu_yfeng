import * as actionTypes from "../../constants/actionType";

const initialState = {};
/**
 * 
 * @param {*} state state 
 * @param {*} id examId
 * @param {*} message
 */
/*const saveMessage = (state, id, message) => ({
  ...state,
  [id]: { ...state[id], ...message }
});*/
const saveMessage = (state, message, examId) => ({
  ...state,
  [examId]: {
    ...state[examId],
    ...message
  }
});

export default function message(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_MESSAGE:
      return saveMessage(state, action.message, action.examId);
    default:
      return state;
  }
}
