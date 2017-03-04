/**
 * Created by hyc on 17-3-4.
 */
import { SAVE_ANSWER } from "../../constants/actionType";
import answerReducer from "./index";

describe("user reducer", () => {
  test("save answerInfo with  {}", () => {
    const initialState = {};
    const answer = {
      userId: "u1",
      answer: {
        examId: "e1",
        questions: { q1: ["a1"], q2: ["b1", "b2"], q3: ["c1", "c2"] }
      }
    };
    const action = {
      type: SAVE_ANSWER,
      answer,
      examId: "e1"
    };
    const expectState = {
      e1: {
        userIds: ["u1"],
        questions: { q1: { a1: 1 }, q2: { b1: 1, b2: 1 }, q3: { c1: 1, c2: 1 } }
      }
    };
    expect(answerReducer(initialState, action)).toEqual(expectState);
  });
  test("save answerInfo with  {}", () => {
    const initialState = {
      e1: {
        userIds: ["u1"],
        questions: { q1: { a1: 1 }, q2: { b1: 1, b2: 1 }, q3: { c1: 1, c2: 1 } }
      },
      e2: {
        userIds: ["u1"],
        questions: { q1: { a1: 1 }, q2: { b1: 1, b2: 1 }, q3: { c1: 1, c2: 1 } }
      }
    };
    const answer = {
      userId: "u2",
      answer: {
        examId: "e1",
        questions: { q1: ["a1"], q2: ["b1", "b2"], q3: ["c1", "c2"] }
      }
    };
    const action = {
      type: SAVE_ANSWER,
      answer,
      examId: "e1"
    };
    const expectState = {
      e2: {
        userIds: ["u1"],
        questions: { q1: { a1: 1 }, q2: { b1: 1, b2: 1 }, q3: { c1: 1, c2: 1 } }
      },
      e1: {
        userIds: ["u1", "u2"],
        questions: { q1: { a1: 2 }, q2: { b1: 2, b2: 2 }, q3: { c1: 2, c2: 2 } }
      }
    };
    expect(answerReducer(initialState, action)).toEqual(expectState);
  });
});
