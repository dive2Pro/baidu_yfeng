/**
 * Created by hyc on 17-3-7.
 */

import * as actionTypes from "../constants/actionType";
import tempReducer from "./temp";

describe("tempReducer", () => {
  test("tempReducer  saveExam", () => {
    const initialState = {};
    const action = {
      type: actionTypes.SAVE_TEMP_EXAM,
      exam: {
        examState: "UN_RELEASE",
        titleId: "t1",
        time: "2017-9-10",
        questionsId: ["q1", "q2", "q3"]
      }
    };
    const expectState = {
      exam: {
        examState: "UN_RELEASE",
        titleId: "t1",
        time: "2017-9-10",
        questionsId: ["q1", "q2", "q3"]
      }
    };
    expect(tempReducer(initialState, action)).toEqual(expectState);
  });
});
