/**
 * Created by hyc on 17-3-4.
 */
import { SAVE_ANSWER } from "../../constants/actionType";
const initialState = {};
const saveAnswer = (state, examId, rowanswer) => {
  const prevEaxm = state[examId] || [];
  const { userId, answer } = rowanswer;
  const oldQuestions = prevEaxm.questions ? { ...prevEaxm.questions } : {};
  for (let q in answer.questions) {
    const question = answer.questions[q]; //q3: ["c1", "c2"]
    const oldQuestion = oldQuestions[q] || {}; //q3:['c1':1,'c2':2]
    for (let innerAnswer of question) {
      let innerOlderAnswerCount = oldQuestion[innerAnswer];
      oldQuestion[innerAnswer] = innerOlderAnswerCount
        ? innerOlderAnswerCount + 1
        : 1;
    }
    oldQuestions[q] = oldQuestion;
  }

  const userIds = prevEaxm.userIds || [];
  userIds.push(userId);
  return {
    ...state,
    [examId]: {
      userIds,
      questions: oldQuestions
    }
  };
};
export default function answer(state = initialState, action) {
  switch (action.type) {
    case SAVE_ANSWER:
      return saveAnswer(state, action.examId, action.answer);
    default:
      return state;
  }
}
