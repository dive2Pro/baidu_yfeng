import * as actionTypes from '../../constants/actionType';

const initialState = {};
const saveMessage = (state, id, message) => ({
  ...state,
  [id]: message
});
export default function message(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_MESSAGE:
      return saveMessage(state, action.id, action.message);
    default:
      return state;
  }
}
