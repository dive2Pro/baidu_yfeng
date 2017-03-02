import * as actionTypes from '../constants/actionType';
import * as topicTypes from '../constants/topicType';
import * as utils from '../constants/utils';
import { saveMessageAct } from './message';

export function addQuestion(title = '请输入', optionsIdCount = 1) {
  return dispatch => {
    //todo 生成题时生成各个选项和标题的messageId
    const question = {
      id: String(parseInt(new Date().getTime()) + '_mock'),
      type: topicTypes.SINGLE_TYPE,
      titleId: utils.guid(),
      optionsId: Array(optionsIdCount).fill(null).map(_ => utils.guid())
    };
    dispatch(
      saveMessageAct({
        [question.titleId]: title
      })
    );
    dispatch({
      type: actionTypes.SAVE_QUESTION,
      id: question.id,
      question
    });
  };
}
