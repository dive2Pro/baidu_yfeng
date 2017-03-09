import * as actionTypes from "../constants/actionType";
import { guid } from "../constants/utils";
export function toggle(toggleType) {
  return {
    type: actionTypes.SET_TOGGLED,
    toggleType
  };
}

export function resetToggled(toggleType) {
  return {
    type: actionTypes.RESET_TOGGLED,
    toggleType
  };
}
export function setToggleId(toggleType, id) {
  return dispatch => {
    const action = {
      type: actionTypes.SET_CURRENTEXAM_ID,
      toggleType,
      id: id || guid()
    };
    dispatch(action);
  };
}
