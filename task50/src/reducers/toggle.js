import * as actionTypes from '../constants/actionType';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return {
        ...state,
        [action.toggleType]: !state[action.toggleType]
      };
    case actionTypes.RESET_TOGGLED:
      return {
        ...state,
        [action.toggleType]: false
      };
    case actionTypes.SET_CURRENTEXAM_ID:
      return {
        ...state,
        [action.toggleType]: action.id
      };
    default:
      return state;
  }
}
