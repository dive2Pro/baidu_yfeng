import * as actionTypes from '../constants/actionType';
export function toggle(toggleType) {
  return {
    type: actionTypes.SET_TOGGLED,
    toggleType
  };
}
