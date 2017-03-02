import exam from './index';
import * as actionTypes from '../../constants/actionType';
describe('exam reducer ', () => {
  test('examreducer changeStatus with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: {
        state: 'ing'
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_STATE,
      id: 'a1',
      state: 'ing'
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer changeStatus with oldState ', () => {
    const initialState = {
      a1: {
        state: 'end',
        title: 'nihao'
      }
    };
    const expectState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_STATE,
      id: 'a1',
      state: 'ing'
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer saveExam with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      }
    };
    const action = {
      type: actionTypes.SAVE_EXAM,
      id: 'a1',
      exam: { state: 'ing', title: 'nihao' }
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
  test('examreducer saveExam with {} ', () => {
    const initialState = {
      a2: {
        state: 'ing222',
        title: 'tahao'
      }
    };
    const expectState = {
      a1: {
        state: 'ing',
        title: 'nihao'
      },
      a2: {
        state: 'ing222',
        title: 'tahao'
      }
    };
    const action = {
      type: actionTypes.SAVE_EXAM,
      id: 'a1',
      exam: { state: 'ing', title: 'nihao' }
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
  test('examreducer CHANGE_EXAM_QUESTIONS ', () => {
    const initialState = {
      a2: {
        state: 'ing222',
        title: 'tahao',
        questions: [1, 2, 3, 4, 5]
      }
    };
    const expectState = {
      a2: {
        state: 'ing222',
        title: 'tahao',
        questions: [5, 5, 3, 4, 5]
      }
    };
    const action = {
      type: actionTypes.CHANGE_EXAM_QUESTIONS,
      id: 'a2',
      questions: [5, 5, 3, 4, 5]
    };
    expect(exam(initialState, action)).toEqual(expectState);
  });
});
