import * as actionTypes from '../constants/actionType';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return {...state, action.toggleType : state[action.toggleType]}
    case actionTypes.RESET_TOGGLED:
      return {...state, action.toggleType:false}  
    default:
      return state;
  }
}
