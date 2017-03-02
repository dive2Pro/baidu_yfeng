import * as actionTypes from '../constants/actionType';
import * as topicTypes from '../constants/topicType';
import * as utils from '../constants/utils';
import { saveMessage } from './message';
import { changeExamQuestions } from './exam';
export function addQuestion(title = '请输入', type, optionsIdCount = 3) {
  return (dispatch, getState) => {
    //todo 生成题时生成各个选项和标题的messageId
    const exam = getState().exam;
    const currentExamId = exam.currentExamId;
    if (!currentExamId) {
      throw 'currentExamId equal null';
    }
    const question = {
      id: String(parseInt(new Date().getTime()) + '_mock'),
      type: type,
      titleId: utils.guid(),
      optionsId: Array(optionsIdCount).fill(null).map(_ => {
        const id = utils.guid();
        dispatch(
          saveMessage({
            [id]: '修改'
          })
        );
        return id;
      })
    };
    const specExam = exam[currentExamId];
    let questionsId;
    if (specExam && specExam.questionsId) {
      specExam.questionsId.push(question.id);
      questionsId = specExam.questionsId;
    } else {
      questionsId = [question.id];
    }
    dispatch(changeExamQuestions(currentExamId, questionsId));
    dispatch(
      saveMessage({
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
