import * as actionTypes from '../../constants/actionType';
const initialState = {};
const changeStatus = (state, id, examState) => {
  return {
    ...state,
    [id]: {
      ...state[id],
      state: examState
    }
  };
};
const saveExam = (state, id, exam) => {
  return {
    ...state,
    [id]: {
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
const changeQuestions = (state, id, questions) => {
  return {
    ...state,
    [id]: { ...state[id], questions }
  };
};
export default function exam(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_EXAM_STATE:
      return changeStatus(state, action.id, action.state);
    case actionTypes.SAVE_EXAM:
      return saveExam(state, action.id, action.exam);
    case actionTypes.CHANGE_EXAM_TITLE:
      return changeExamTitle(state, action.id, action.title);
    case actionTypes.CHANGE_EXAM_QUESTIONS:
      return changeQuestions(state, action.id, action.questions);
    default:
      return state;
  }
}
