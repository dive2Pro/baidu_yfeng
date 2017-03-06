/**
 * Created by hyc on 17-3-6.
 */
import * as actionTypes from "../constants/actionType";
import toggleReducer from "./toggle";
import { ANSWER_MODE } from "../constants/toggleTypes";

describe("toggleReducer", () => {
  test("toggleReducer  SET_TOGGLED", () => {
    const initialState = {};
    const isAnswerMode = true;
    const action = {
      type: actionTypes.SET_TOGGLED,
      toggleType: ANSWER_MODE
    };
    const expectState = {
      ANSWER_MODE: true
    };
    expect(toggleReducer(initialState, action)).toEqual(expectState);
    const expectState2 = {
      ANSWER_MODE: false
    };
    expect(toggleReducer(expectState, action)).toEqual(expectState2);
  });

});
