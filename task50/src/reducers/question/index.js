import * as actionTypes from "../../constants/actionType";
const initialState = {
  tempIds: []
};

Object.defineProperty(initialState, "tempIds", {
  enumerable: false
});

const changeContentId = (state, id, contentId) => ({
  ...state,
  [id]: { ...state[id], contentId }
});

const changeTitleId = (state, id, titleId) => ({
  ...state,
  [id]: { ...state[id], titleId }
});
const changeOptionsId = (state, id, optionsId) => ({
  ...state,
  [id]: { ...state[id], optionsId }
});
const saveQuestion = (state, id, question) => ({
  ...state,
  [id]: { ...question }
});
const changeRequire = (state, id, require) => ({
  ...state,
  [id]: { ...state[id], require }
});

export default function question(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_QUESTION_CONTENTID:
      return changeContentId(state, action.id, action.contentId);
    case actionTypes.SAVE_QUESTION:
      return saveQuestion(state, action.id, action.question);
    case actionTypes.CHANGE_QUESTION_TITLEID:
      return changeTitleId(state, action.id, action.titleId);
    case actionTypes.CHANGE_QUESTION_OPTIONSID:
      return changeOptionsId(state, action.id, action.optionsId);
    case actionTypes.CHANGE_QUESTION_REQUIRE:
      return changeRequire(state, action.id, action.require);
    default:
      return state;
  }
}
