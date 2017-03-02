import * as actionTypes from '../../constants/actionType';
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
const changeQuestions = (state, id, questionsId) => {
  return {
    ...state,
    [id]: { ...state[id], questionsId }
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
    case actionTypes.SET_CURRENTEXAM_ID:
      return { ...state, currentExamId: action.examId };
    default:
      return state;
  }
}
