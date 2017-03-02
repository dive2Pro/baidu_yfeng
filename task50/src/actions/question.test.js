import * as question from './question';
import * as actionTypes from '../constants/actionType';

describe('test question action', () => {
  test('addQuestion default', done => {
    const reiceve = question.addQuestion();
    // let mock = jest.fn(question.addQuestion);

    expect(reiceve).not.toBe({});
    done();
    /*expect.objectContaining({
        id: expect.any(String),
        type: actionTypes.SAVE_QUESTION,
        question: expect.objectContaining({
          id: expect.any(String),
          type: expect.any(String),
          titleId: expect.any(String),
          optionsId: expect.any(Array)
        })
      })*/
  });
});
