import question from "./index";
import * as actionTypes from "../../constants/actionType";

describe("question reducer ", () => {
  test("questionreducer CHANGE_QUESTION_CONTENTID with {} ", () => {
    const initialState = {};
    const expectState = {
      a1: {
        contentId: "123"
      }
    };
    const action = {
      type: actionTypes.CHANGE_QUESTION_CONTENTID,
      id: "a1",
      contentId: "123"
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer CHANGE_QUESTION_CONTENTID with oldState ", () => {
    const initialState = {
      a1: {
        state: "end",
        contentId: "a23"
      }
    };
    const expectState = {
      a1: {
        state: "end",
        contentId: "nihao"
      }
    };
    const action = {
      type: actionTypes.CHANGE_QUESTION_CONTENTID,
      id: "a1",
      contentId: "nihao"
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer savequestion with {} ", () => {
    const initialState = {};
    const expectState = {
      a1: {
        state: "ing",
        title: "nihao"
      }
    };
    const action = {
      type: actionTypes.SAVE_QUESTION,
      id: "a1",
      question: { state: "ing", title: "nihao" }
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer savequestion with {} ", () => {
    const initialState = {
      a2: {
        state: "ing222",
        title: "tahao"
      }
    };
    const expectState = {
      a1: {
        state: "ing",
        title: "nihao"
      },
      a2: {
        state: "ing222",
        title: "tahao"
      }
    };
    const action = {
      type: actionTypes.SAVE_QUESTION,
      id: "a1",
      question: { state: "ing", title: "nihao" }
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer CHANGE_QUESTION_TITLEID ", () => {
    const initialState = {
      a2: {
        state: "ing222",
        titleId: "tahao"
      }
    };
    const expectState = {
      a2: {
        state: "ing222",
        titleId: "123123123"
      }
    };
    const action = {
      type: actionTypes.CHANGE_QUESTION_TITLEID,
      id: "a2",
      titleId: "123123123"
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer CHANGE_QUESTION_OPTIONSID ", () => {
    const initialState = {
      a2: {
        state: "ing222",
        title: "tahao",
        optionsId: [1, 2, 3, 4, 5]
      }
    };
    const expectState = {
      a2: {
        state: "ing222",
        title: "tahao",
        optionsId: [5, 5, 3, 4, 5]
      }
    };
    const action = {
      type: actionTypes.CHANGE_QUESTION_OPTIONSID,
      id: "a2",
      optionsId: [5, 5, 3, 4, 5]
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  test("questionreducer CHANGE_QUESTION_REQUIRE ", () => {
    const initialState = {
      a2: {
        state: "ing222",
        title: "tahao",
        optionsId: [1, 2, 3, 4, 5],
        require: "on"
      }
    };
    const expectState = {
      a2: {
        state: "ing222",
        title: "tahao",
        optionsId: [1, 2, 3, 4, 5],

        require: "off"
      }
    };
    const action = {
      type: actionTypes.CHANGE_QUESTION_REQUIRE,
      id: "a2",
      require: "off"
    };
    expect(question(initialState, action)).toEqual(expectState);
  });
  // test("questionreducer SAVE_TEMP_QUESTION ", () => {
  //   const initialState = {
  //     a2: {
  //       state: "ing222",
  //       title: "tahao",
  //       optionsId: [1, 2, 3, 4, 5],
  //       require: "on"
  //     }
  //   };
  //   const expectState = {
  //     a2: {
  //       state: "ing222",
  //       title: "tahao",
  //       optionsId: [1, 2, 3, 4, 5],
  //       require: "on"
  //     },
  //     tempIds: ["a2"]
  //   };
  //   const action = {
  //     type: actionTypes.SAVE_TEMP_QUESTION,
  //     id: "a2"
  //   };
  //   expect(question(initialState, action)).toEqual(expectState);
  // });
  // test("questionreducer Clear tempIds ", () => {
  //   const initialState = {
  //     a2: {
  //       state: "ing222",
  //       title: "tahao",
  //       optionsId: [1, 2, 3, 4, 5],
  //       require: "on"
  //     },
  //     tempIds: [1, 2, 3, 4]
  //   };
  //
  //   const expectState = {
  //     a2: {
  //       state: "ing222",
  //       title: "tahao",
  //       optionsId: [1, 2, 3, 4, 5],
  //       require: "on"
  //     },
  //     tempIds: []
  //   };
  //   const action = {
  //     type: actionTypes.CLEAR_TEMP_QUESTION
  //   };
  //   const receive = question(initialState, action);
  //   expect(receive).toMatchObject(expectState);
  //   // expect(receive).toEqual(expectState);
  //   expect(Object.keys(receive)).toEqual(["a2"]);
  // });
});
