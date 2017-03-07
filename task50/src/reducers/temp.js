/**
 * Created by hyc on 17-3-7.
 */
import * as actionTypes from "../constants/actionType";

const saveTempQustion = (state, id) => {
  const newTempIds = (state.tempIds && state.tempIds.slice()) || [];
  newTempIds.push(id);
  return {
    ...state,
    tempIds: newTempIds
  };
};
const clearTempQustion = state => {
  const newState = {
    ...state,
    tempIds: []
  };
  return newState;
};
const initialState = { tempIds: [] };
export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_TEMP_QUESTION:
      return saveTempQustion(state, action.id);
    case actionTypes.CLEAR_TEMP_QUESTION:
      return clearTempQustion(state);
    default:
      return state;
  }
}
