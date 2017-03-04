/**
 * Created by hyc on 17-3-4.
 */
import * as actionTypes from "../../constants/actionType";
const initialState = {};

/**
 *
 * @param state
 * @param userId
 * @param answer
 * @param answer :
  *              examId:
 *                  questionID:
 *                    [messageId]
 * @returns {{}}
 */
const saveAnswer = (state, userId, answer) => {
  return {
    ...state,
    [userId]: {
      [answer.examId]: {
        ...answer
      }
    }
  };
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_ANSWER_TO_USER:
      return saveAnswer(state, action.userId, action.answer);
    // case actionTypes.GENE_USER:
    default:
      return state;
  }
}
