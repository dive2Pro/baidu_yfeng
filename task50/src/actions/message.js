import * as actionTypes from "../constants/actionType";
import { CURRENT_EXAM } from "../constants/toggleTypes";

export function saveMessageAct(examId, message) {
  return {
    type: actionTypes.SAVE_MESSAGE,
    message,
    examId
  };
}
/**
 *
 * @param message {[id]:content}
 * @returns {function(*=)}
 */
export function saveMessage(message, examId) {
  return (dispatch, getState) => {
    console.log(dispatch);
    const currentId = examId || getState().toggle[CURRENT_EXAM];
    dispatch(saveMessageAct(currentId, message));
  };
}
