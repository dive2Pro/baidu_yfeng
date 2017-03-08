/**
 * Created by hyc on 17-3-6.
 */
import {
  SAVE_ANSWER,
  SAVE_TEMP_EXAM,
  CLEAR_TEMP_EXAM
} from "../constants/actionType";
import { CURRENT_EXAM } from "../constants/toggleTypes";
import { saveMessage, saveExamAction } from "./index";
import { saveQuestions } from "./question";
export function saveAnswer(answerInfo, userId = "u1") {
  return {
    type: SAVE_ANSWER,
    answer: { answer: answerInfo.answer, userId },
    examId: answerInfo.answer.examId
  };
}
export const saveTempExam = () => (dispatch, getState) => {
  const rootState = getState();
  const { question, exam, toggle, message } = rootState;
  const currentExamId = toggle[CURRENT_EXAM];
  const currentExam = exam[currentExamId];
  const { questionsId } = currentExam;
  const tempQuestions = {};
  questionsId.forEach(id => {
    tempQuestions[id] = { ...question[id] };
  });
  const tempMessage = message[currentExamId];
  const tempExam = {
    exam: { ...currentExam },
    question: tempQuestions,
    message: tempMessage
  };
  const copyTempExam = JSON.parse(JSON.stringify(tempExam));
  return Promise.resolve(tempExam).then(exam => dispatch({
    type: SAVE_TEMP_EXAM,
    tempExam: copyTempExam
  }));
};

export const restoreTempExam = () => (dispatch, getState) => {
  const rootState = getState();
  const { temp, toggle } = rootState;
  const currentExamId = toggle[CURRENT_EXAM];
  const tempExam = temp.tempExam;
  dispatch(saveExamAction(tempExam.exam));
  dispatch(saveMessage(tempExam.message, currentExamId));
  dispatch(saveQuestions(tempExam.question));
  dispatch({ type: CLEAR_TEMP_EXAM, examId: currentExamId });
};
