import * as actionTypes from '../constants/actionType';
import * as utils from '../constants/utils';
import { saveMessage } from './message';
import { addQuestion } from './question';

export function changeExamState(id, examState) {
  return {
    type: actionTypes.CHANGE_EXAM_STATE,
    id,
    examState
  };
}
export const changeExamTime = (id, time) => ({
  type: actionTypes.CHANGE_EXAM_TIME,
  id,
  time
});

export const saveExamAction = exam => ({
  type: actionTypes.SAVE_EXAM,
  id: exam.id,
  exam
});

export function saveExam(
  currentExamId,
  examState,
  title = '等待填写',
  time = new Date()
) {
  return (dispatch, getState) => {
    const titleId = utils.guid(); // const exam = getState().exam; // const currentExamId = exam.currentExamId;
    dispatch(
      saveMessage({
        [titleId]: title
      })
    );
    dispatch(
      saveExamAction({
        examState,
        time,
        id: currentExamId,
        titleId
      })
    );
  };
}
export function setCurrentExamId(examId) {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CURRENTEXAM_ID,
      examId: examId || utils.guid()
    });
  };
}
export function changeExamQuestions(id, questionsId = []) {
  return {
    type: actionTypes.CHANGE_EXAM_QUESTIONS,
    id,
    questionsId
  };
}
export function opeExamQuestions(examId, question, actType) {
  return (dispatch, getState) => {
    const state = getState();
    const exam = state.exam[examId];
    const questionsId = exam.questionsId;
    const { id, type, optionsId } = question;
    let sortedQuestionsId;
    switch (actType) {
      case 0: //duplicate
        const quesCount = optionsId.length;
        dispatch(addQuestion('duplicateQuestion', type, quesCount));
        return;
      case 1:
        // down
        sortedQuestionsId = utils.moveElementInArray(questionsId, id, 1);
        break;
      case -1:
        //upper
        sortedQuestionsId = utils.moveElementInArray(questionsId, id, -1);
        break;
      case 2: // delete
        sortedQuestionsId = utils.deleteElementFromArray(questionsId, id);
        break;
      default:
    }
    dispatch(changeExamQuestions(examId, sortedQuestionsId));
  };
}
