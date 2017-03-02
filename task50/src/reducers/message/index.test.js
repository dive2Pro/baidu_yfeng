import * as actionTypes from '../../constants/actionType';
import message from './index';

describe('message reducer ', () => {
  test('messagereducer changeStatus with {} ', () => {
    const initialState = {};
    const expectState = {
      a1: 'ing'
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      id: 'a1',
      message: 'ing'
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
  test('messagereducer changeStatus with {} ', () => {
    const initialState = {
      a1: 'ing',
      a2: 'tian tang'
    };
    const expectState = {
      a1: 'ebd',
      a2: 'tian tang'
    };
    const action = {
      type: actionTypes.SAVE_MESSAGE,
      id: 'a1',
      message: 'ebd'
    };
    expect(message(initialState, action)).toEqual(expectState);
  });
});
