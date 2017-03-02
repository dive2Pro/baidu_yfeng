import exam from './index';
import * as actionTypes from '../../constants/actionType';
describe('exam reducer ', () => {
  test('examreducer changeStatus with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: {
        examState: 'ing'
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_STATE,
      id: 'a1',
      examState: 'ing'
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer changeStatus with oldState ', () => {
    const initialState = {
      a1: {
        examState: 'end',
        title: 'nihao'
      }
    };
    const expectState = {
      a1: {
        examState: 'ing',
        title: 'nihao'
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_STATE,
      id: 'a1',
      examState: 'ing'
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer saveExam with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: {
        id: 'a1',
        examState: 'ing',
        title: 'nihao'
      }
    };
    const action = {
      type: actionTypes.SAVE_EXAM,
      id: 'a1',
      exam: { examState: 'ing', title: 'nihao', id: 'a1' }
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer saveExam with oldState ', () => {
    const initialState = {
      a2: {
        state: 'ing222',
        title: 'tahao',
        questionsId: [2, 3, 4, 5, 6]
      }
    };
    const expectState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      },
      a2: {
        state: 'ing222',
        title: 'tahao',
        questionsId: [2, 3, 4, 5, 6]
      }
    };
    const action = {
      type: actionTypes.SAVE_EXAM,
      id: 'a1',
      exam: { state: 'ing', title: 'nihao' }
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer saveExam with oldState have questionsId ', () => {
    const initialState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      },
      a2: {
        state: 'ing222',
        title: 'tahao',
        questionsId: [2, 3, 4, 5, 6]
      }
    };
    const expectState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      },
      a2: {
        state: 'end',
        title: 'nihao',
        questionsId: [2, 3, 4, 5, 6]
      }
    };
    const action = {
      type: actionTypes.SAVE_EXAM,
      id: 'a2',
      exam: { state: 'end', title: 'nihao' }
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer CHANGE_EXAM_TITLE ', () => {
    const initialState = {
      a2: {
        state: 'ing222',
        title: 'tahao'
      }
    };
    const expectState = {
      a2: {
        state: 'ing222',
        title: '123123123'
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_TITLE,
      id: 'a2',
      title: '123123123'
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer CHANGE_EXAM_QUESTIONS　when initialState =  {} ', () => {
    const initialState = {};
    const expectState = {
      a2: {
        questionsId: [5, 5, 3, 4, 5]
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_QUESTIONS,
      id: 'a2',
      questionsId: [5, 5, 3, 4, 5]
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer CHANGE_EXAM_QUESTIONS ', () => {
    const initialState = {
      a2: {
        state: 'ing222',
        title: 'tahao',
        questionsId: [1, 2, 3, 4, 5]
      }
    };
    const expectState = {
      a2: {
        state: 'ing222',
        title: 'tahao',
        questionsId: [5, 5, 3, 4, 5]
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_QUESTIONS,
      id: 'a2',
      questionsId: [5, 5, 3, 4, 5]
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
});
