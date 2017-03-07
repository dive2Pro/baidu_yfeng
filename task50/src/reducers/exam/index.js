import * as actionTypes from "../../constants/actionType";
const initialState = {};
const changeStatus = (state, id, examState) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      examState
    }
  };
};
const saveExam = (state, id, exam) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      ...exam
    }
  };
};

const changeExamTitle = (state, id, title) => {
  return {
    ...state,
    [id]: { ...state[id], title }
  };
};
const changeExamTime = (state, id, time) => {
  return {
    ...state,
    [id]: { ...state[id], time }
  };
};
const changeQuestions = (state, id, questionsId) => {
  return {
    ...state,
    [id]: { ...state[id], questionsId }
  };
};
const changeExamChecked = (state, id, checked) => {
  return {
    ...state,
    [id]: { ...state[id], checked }
  };
};
export default function exam(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_EXAM_STATE:
      return changeStatus(state, action.id, action.examState);
    case actionTypes.SAVE_EXAM:
      return saveExam(state, action.id, action.exam);
    case actionTypes.CHANGE_EXAM_TITLE:
      return changeExamTitle(state, action.id, action.title);
    case actionTypes.CHANGE_EXAM_QUESTIONS:
      return changeQuestions(state, action.id, action.questionsId);
    case actionTypes.CHANGE_EXAM_TIME:
      return changeExamTime(state, action.id, action.time);
    case actionTypes.CHANGE_EXAM_CHECKED:
      return changeExamChecked(state, action.id, action.checked);
    default:
      return state;
  }
}
