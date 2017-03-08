/**
 * Created by hyc on 17-3-6.
 */
import { SAVE_ANSWER, SAVE_TEMP_EXAM } from "../constants/actionType";
import { CURRENT_EXAM } from "../constants/toggleTypes";
export function saveAnswerAct(answerInfo, userId = "u1") {
  return {
    type: SAVE_ANSWER,
    answer: { answer: answerInfo.answer, userId },
    examId: answerInfo.answer.examId
  };
}

export function saveAnswer(answerInfo, userId = "u1") {
  return (dispatch, getState) => {
    const rootState = getState();
    const { temp, exam, toggle, message } = rootState;

    // 1. 从temp中 拿到保存的 exam

    // 2. 将其覆盖state中的数据

    const currentExamId = toggle[CURRENT_EXAM];
    const currentExam = exam[currentExamId];
    const { questionsId } = currentExam;
    dispatch(saveAnswerAct(answerInfo));
  };
}
export const saveTempExam = () => (dispatch, getState) => {
  const rootState = getState();
  const { question, temp, exam, toggle, message } = rootState;
  const currentExamId = toggle[CURRENT_EXAM];
  const currentExam = exam[currentExamId];
  const { questionsId } = currentExam;
  const tempQuestions = {};
  questionsId.forEach(id => {
    tempQuestions[id] = question[id];
  });
  const tempMessage = message[currentExamId];
  const tempExam = {
    exam,
    question: tempQuestions,
    message: tempMessage
  };
  const p =  Promise.resolve(tempExam)
    .then(exam => dispatch({
      type: SAVE_TEMP_EXAM,
      tempExam: exam
    }));
  console.log(p);
  return p
};
