import * as actionTypes from '../constants/actionType';
import * as topicTypes from '../constants/topicType';

export function saveMessageAct(message) {
  return {
    type: actionTypes.SAVE_MESSAGE,
    message
  };
}
/**
 *
 * @param message {[id]:content}
 * @returns {function(*=)}
 */
export function saveMessage(message) {
  return dispatch => {
    console.log(dispatch);
    dispatch(saveMessageAct(message));
  };
}
