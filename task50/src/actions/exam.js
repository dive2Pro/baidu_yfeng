import * as actionTypes from "../constants/actionType";
import { CURRENT_EXAM } from "../constants/toggleTypes";
import * as utils from "../constants/utils";
import { saveMessage } from "./message";
import { addQuestion } from "./question";
import { NEW_GENE } from "../constants/examStateType";
import { setToggleId } from "./toggle";
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

export function saveExam(currentExamId, examState, time = new Date()) {
  return (dispatch, getState) => {
    dispatch(
      saveExamAction({
        examState,
        time,
        id: currentExamId
      })
    );
  };
}

export function geneExam(title = "未填写") {
  return dispatch => {
    const titleId = utils.guid(); // const exam = getState().exam; // const currentExamId = exam.currentExamId;
    dispatch(
      saveMessage({
        [titleId]: title
      })
    );
    const examId = utils.guid();
    const exam = {
      id: examId,
      examState: NEW_GENE,
      titleId
    };
    dispatch(saveExamAction(exam));
    dispatch(saveTempExam(exam));
    dispatch(setToggleId(CURRENT_EXAM, examId));
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
        dispatch(addQuestion("duplicateQuestion", type, quesCount));
        return;
      case 1: // down
        sortedQuestionsId = utils.moveElementInArray(questionsId, id, 1);
        break;
      case -1: //upper
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

export function setExamChecked(checked, ...ids) {
  return dispatch => {
    ids.forEach(id => {
      dispatch({
        type: actionTypes.CHANGE_EXAM_CHECKED,
        checked,
        id
      });
    });
  };
}

export function saveTempExam(exam) {
  return {
    type: actionTypes.SAVE_TEMP_EXAM,
    exam
  };
}

export function clearTempExam() {
  return {
    type: actionTypes.CLEAR_TEMP_EXAM
  };
}
