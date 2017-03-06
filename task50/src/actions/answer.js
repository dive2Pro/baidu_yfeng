/**
 * Created by hyc on 17-3-6.
 */
import { SAVE_ANSWER } from "../constants/actionType";

export function saveAnswer(answerInfo, userId = "u1") {
  return {
    type: SAVE_ANSWER,
    answer: { answer: answerInfo.answer, userId },
    examId: answerInfo.answer.examId
  };
}
