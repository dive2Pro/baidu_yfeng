import * as actionTypes from '../constants/actionType';
import * as utils from '../constants/utils';
import { saveMessage } from './message';
export function changeExamState(id, examState) {
  return {
    type: actionTypes.CHANGE_EXAM_STATE,
    id,
    examState
  };
}

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
export function changeExamQuestions(id, questionsId) {
  return {
    type: actionTypes.CHANGE_EXAM_QUESTIONS,
    id,
    questionsId
  };
}
