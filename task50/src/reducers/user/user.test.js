/**
 * Created by hyc on 17-3-4.
 */
import { SAVE_ANSWER_TO_USER } from "../../constants/actionType";
import user from "./index";

describe("user reducer", () => {
  test("save answerInfo with user {}", () => {
    const initialState = {};
    const answer = {
      examId: "an1",
      questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
    };
    const action = {
      type: SAVE_ANSWER_TO_USER,
      answer,
      userId: "u1"
    };
    const expectState = {
      u1: {
        an1: {
          examId: "an1",
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    expect(user(initialState, action)).toEqual(expectState);
  });
  test("save answerInfo with user oldState", () => {
    const initialState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    const answer = {
      examId: "an1",
      questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
    };
    const action = {
      type: SAVE_ANSWER_TO_USER,
      answer,
      userId: "u1"
    };
    const expectState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      },
      u1: {
        an1: {
          examId: "an1",
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    expect(user(initialState, action)).toEqual(expectState);
  });
  test("save answerInfo with user other perp like time ", () => {
    const initialState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    const answer = {
      examId: "an1",
      time: "2017-3-1",
      questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
    };
    const action = {
      type: SAVE_ANSWER_TO_USER,
      answer,
      userId: "u1"
    };
    const expectState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      },
      u1: {
        an1: {
          time: "2017-3-1",
          examId: "an1",
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    expect(user(initialState, action)).toEqual(expectState);
  });
  test("update answerInfo with user update ", () => {
    const initialState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      },
      u1: {
        an1: {
          time: "2017-3-3",
          examId: "an1",
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    const answer = {
      examId: "an1",
      time: "2017-3-1",
      questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
    };
    const action = {
      type: SAVE_ANSWER_TO_USER,
      answer,
      userId: "u1"
    };
    const expectState = {
      u2: {
        an2: {
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      },
      u1: {
        an1: {
          time: "2017-3-1",
          examId: "an1",
          questions: { q1: "a1", q2: ["b1", "b2"], q3: ["c1", "c2"] }
        }
      }
    };
    expect(user(initialState, action)).toEqual(expectState);
  });
});
