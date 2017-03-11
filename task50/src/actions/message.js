import * as actionTypes from "../constants/actionType";
import { CURRENT_EXAM } from "../constants/toggleTypes";
import { debounce } from "../constants/utils";
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
let d;
export function saveMessage(message, examId) {
  return (dispatch, getState) => {
    const currentId = examId || getState().toggle[CURRENT_EXAM];
    if (!d) {
      d = debounce((cid, msg) => {
        console.log(cid, msg);
        dispatch(saveMessageAct(cid, msg));
      });
    }
    d(currentId, message);
  };
}
