import * as actionTypes from "../constants/actionType";
import * as topicTypes from "../constants/topicType";
import { CURRENT_EXAM } from "../constants/toggleTypes";
import * as utils from "../constants/utils";
import { saveMessage } from "./message";
import { changeExamQuestions } from "./exam";

export function setRequire(quesId, require = true) {
  return {
    type: actionTypes.CHANGE_QUESTION_REQUIRE,
    id: quesId,
    require
  };
}

export function addQuestion(title = "请输入", type, optionsIdCount = 3) {
  return (dispatch, getState) => {
    //todo 生成题时生成各个选项和标题的messageId
    const {
      exam,
      toggle
    } = getState();
    const currentExamId = toggle[CURRENT_EXAM];
    if (!currentExamId) {
      throw "currentExamId equal null";
    }
    const isNotTextQuestion = type !== topicTypes.TEXT_TYPE;
    const question = {
      id: String(parseInt(new Date().getTime()) + "_mock"),
      type: type,
      titleId: utils.guid(),
      optionsId: isNotTextQuestion &&
        new Array(optionsIdCount).fill(null).map(_ => {
          const id = utils.guid();
          dispatch(
            saveMessage({
              [id]: "修改"
            })
          );
          return id;
        }),
      contentId: utils.guid()
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
    dispatch(saveTempQuestion(question.id));
    dispatch(saveQuestion(question));
  };
}
export function saveQuestion(question) {
  return {
    type: actionTypes.SAVE_QUESTION,
    id: question.id,
    question
  };
}
export function saveTempQuestion(questionId) {
  return {
    type: actionTypes.SAVE_TEMP_QUESTION,
    id: questionId
  };
}
export function saveTempQuestionTitleId(TitleId) {
  return {
    type: actionTypes.SAVE_TEMP_QUESTION_TITLE,
    id: TitleId
  };
}
export function clearTempQuestion() {
  return {
    type: actionTypes.CLEAR_TEMP_QUESTION
  };
}

export function setContentId(questionId, contentId, content = "") {
  return dispatch => {
    const messageId = contentId || utils.guid();
    dispatch(saveMessage({ [messageId]: content }));

    dispatch({
      type: actionTypes.CHANGE_QUESTION_CONTENTID,
      id: questionId,
      contentId: messageId
    });
  };
}
