import * as exam from './exam';
import * as actionTypes from '../constants/actionType';

describe('test exam action', () => {
  test('changeExamState default', () => {
    const receive = exam.changeExamState('a1', 'ing');
    const expectAction = {
      type: actionTypes.CHANGE_EXAM_STATE,
      id: 'a1',
      examState: 'ing'
    };
    expect(receive).toEqual(expectAction);
  });

  test('saveExam test', () => {
    const receive = exam.saveExamAction({
      examState: 'end',
      time: '2017-9-2',
      questionsId: [1, 2, 3, 4, 5],
      id: 'a2',
      titleId: 't1'
    });
    const expectAction = {
      type: actionTypes.SAVE_EXAM,
      id: 'a2',
      exam: {
        examState: 'end',
        time: '2017-9-2',
        questionsId: [1, 2, 3, 4, 5],
        id: 'a2',
        titleId: 't1'
      }
    };
    expect(receive).toEqual(expectAction);
  });
});
