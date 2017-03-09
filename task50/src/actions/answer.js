/**
 * Created by hyc on 17-3-6.
 */
import {
  SAVE_ANSWER,
  SAVE_TEMP_EXAM,
  CLEAR_TEMP_EXAM,
  SET_TEMP_WARNING
} from "../constants/actionType";
import { CURRENT_EXAM, WARNING_MODAL } from "../constants/toggleTypes";
import { saveMessage, saveExamAction } from "./index";
import { saveQuestions } from "./question";
import { toggle } from "./toggle";
import { RELEASED } from "../constants/examStateType";
export function saveAnswer(answerInfo, userId = "u1") {
  return {
    type: SAVE_ANSWER,
    answer: { answer: answerInfo.answer, userId },
    examId: answerInfo.answer.examId
  };
}
const tempWarning = message => ({
  type: SET_TEMP_WARNING,
  message
});

/**
 * @answerInfo 当前[ExamId]:
 *      [questionId]:
 *          [
 *           optionsId
 *          ]
 */
export const handleSubmit = (currentExamId, questionsAnswer) => (
  dispatch,
  getState
) => {
  if (!questionsAnswer) {
    return;
  }
  const rootState = getState();
  const { exam, question, message } = rootState;
  const currentExam = exam[currentExamId];
  const { examState } = currentExam;

  if (examState !== RELEASED) {
    dispatch(toggle(WARNING_MODAL));
    dispatch(tempWarning("本问卷未发布,本次答复无效!"));
    return;
  }

  //todo filter require
  let hasRequireQustionDidntAnswer = false;
  let t_question = {};
  currentExam.questionsId.some(qid => {
    t_question = question[qid];
    if (t_question.require) {
      hasRequireQustionDidntAnswer = !questionsAnswer[qid] ||
        questionsAnswer[qid].keyLength < 1;
      return hasRequireQustionDidntAnswer;
    }
    return false;
  });
  if (hasRequireQustionDidntAnswer) {
    dispatch(toggle(WARNING_MODAL));
    dispatch(tempWarning("该问题必须回答: " + message[t_question.titleId]));
    return;
  }

  const shakedAnswer = {};
  Object.keys(questionsAnswer)
    .filter(key => questionsAnswer[key].length > 0)
    .forEach(qId => {
      shakedAnswer[qId] = questionsAnswer[qId];
    });
  const hasRequireQuestionUnAnswer = currentExam.questionsId.length >
    shakedAnswer.length;
  // 过滤
  // const contentIdNotNullQuestions = currentExam.questionsId
  //   .filter(qid => {
  //     return question[qid].type === topicTypes.TEXT_TYPE;
  //   })
  //   .filter(qid => {
  //     return message[question[qid].contentId];
  //   })
  //   .map(qid => ({
  //     [qid]: [question[qid].contentId]
  //   }));
  // contentIdNotNullQuestions.forEach(q => {
  //   questions = { ...shakedAnswer, ...q };
  //  });
  // const questions = { ...shakedAnswer };
  const answerObj = {
    answer: { examId: currentExamId, questions: shakedAnswer }
  };
  dispatch(saveAnswer(answerObj));
};

export const saveTempExam = () => (dispatch, getState) => {
  const rootState = getState();
  const { question, exam, toggle, message } = rootState;
  const currentExamId = toggle[CURRENT_EXAM];
  const currentExam = exam[currentExamId];
  const { questionsId } = currentExam;
  const tempQuestions = {};
  questionsId.forEach(id => {
    tempQuestions[id] = { ...question[id] };
  });

  const tempMessage = message[currentExamId];
  const tempExam = {
    exam: { ...currentExam },
    question: tempQuestions,
    message: tempMessage
  };
  const copyTempExam = JSON.parse(JSON.stringify(tempExam));
  return Promise.resolve(tempExam).then(exam => dispatch({
    type: SAVE_TEMP_EXAM,
    tempExam: copyTempExam
  }));
};

export const restoreTempExam = () => (dispatch, getState) => {
  const rootState = getState();
  const { temp, toggle } = rootState;
  const currentExamId = toggle[CURRENT_EXAM];
  const tempExam = temp.tempExam;
  dispatch(saveExamAction(tempExam.exam));
  dispatch(saveMessage(tempExam.message, currentExamId));
  dispatch(saveQuestions(tempExam.question));
  dispatch({ type: CLEAR_TEMP_EXAM, examId: currentExamId });
};
