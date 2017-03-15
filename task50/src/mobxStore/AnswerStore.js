/**
 * Created by hyc on 17-3-15.
 */
import { observable, computed } from "mobx";
import { guid } from "../constants/utils";
class AnswerStore {
  @observable answerInfo = {}; 
  updateFromServer(examId) {
    return this.answerInfo[examId];
    // .then(data=>data.toJson())
    // .then(json=>{
    //     /**
    //      *
    //      */
    //     answerInfo.title=json.title;
    //     answerInfo.questions=json.questions;
    //     json.questions.forEach(question=>{
    //         const qt = question.title;
    //         const type = question.type;
    //         const questionAnswerCount = question.answerCount;
    //
    //         question.options.forEach(option=>{
    //             const oid = option.id;
    //             const ot = option.title
    //             const oc = option.count
    //         })
    //         const contentCount = question.contentAnswerCount
    //     })
    // })
  }
  saveAnswerToServer(examAnswerInfo, userId = guid()) {
    const { id: eid, title: et, questions } = examAnswerInfo;
    console.log(examAnswerInfo);
    let storeExam = this.answerInfo[eid];
    if (!storeExam) {
      storeExam = {};
      storeExam.title = et;
      storeExam.id = eid;
      storeExam.count =0;
      this.answerInfo[eid] = storeExam;
    }
    storeExam.count++;

    let storeQuestions = storeExam.questions;
    if (!storeQuestions) {
      storeQuestions = [];
    }
    questions.forEach(q => {
      const { id: qid, title: qt, type, content, options } = q;
      let storeQ = storeQuestions.find(sq => sq.id === qid);
      if (!storeQ) {
        storeQ = {};
        storeQ.title = qt;
        storeQ.type = type;
        storeQ.id=qid;
        storeQuestions.push(storeQ);
      }
      if (type === "TEXT_TYPE" && content) {
        storeQ.contentAnswerCount = (storeQ.contentAnswerCount || 0) +
          (+(content.length > 0));
      } else {
        const storeOptions = storeQ.options || [];
        options.forEach(o => {
          const { id: oid, title: ot, isChecked } = o;
          let storOption = storeOptions.find(so => so.id === oid);
          if (!storOption) {
            storOption = {};
            storOption.id = oid;
            storOption.title = ot;
            storOption.count=0;
            storeOptions.push(storOption);
          }
          storOption.count = (storOption.count || 0) + (isChecked ? 1 : 0);
        });
        storeQ.options = storeOptions;
      }
    });
    storeExam.questions = storeQuestions;    
    console.log(this.answerInfo);
  }
}

export default new AnswerStore;
