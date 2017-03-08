import * as actionTypes from "../../constants/actionType";
import message from "./index";

/*describe('message reducer ', () => {
  test('messagereducer changeStatus with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: {
        b1: '123'
      }
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      id: 'a1',
      message: {
        b1: '123'
      }
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
  test('messagereducer changeStatus with oldState', () => {
    const initialState = {
      a1: {
        b1: '123'
      },
      a2: {
        b2: '222',
        b22: '333'
      }
    };
    const expectState = {
      a1: {
        b1: '123'
      },
      a2: {
        b2: '222',
        b22: 'qwe'
      }
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      id: 'a2',
      message: {
        b22: 'qwe'
      }
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
});*/

describe("message reducer ", () => {
  test("messagereducer changeStatus with {} ", () => {
    const initialState = {};
    const expectState = {
      e1: { a1: "ing" }
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      examId: "e1",
      message: { a1: "ing" }
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
  test("messagereducer changeStatus with {} ", () => {
    const initialState = {
      a1: "ing",
      a2: "tian tang"
    };
    const expectState = {
      a1: "ing",
      a2: "tian tang",
      e1: {
        a1: "ebd"
      }
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      examId: "e1",
      message: {
        a1: "ebd"
      }
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
});
