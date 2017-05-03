import { toJS, computed, action, observable } from 'mobx';
import { TEXT_TYPE } from '../constants/topicType';
class Answers {
  answers = new observable.map();
  @observable currentAnswerId: '';

  getAnswer = id => {
    return this.answers.get(id);
  };
  @action saveAnswer(exam) {
    const { id, questions } = exam;
    let ans = this.answers.get(id);
    if (!ans) {
      this.answers.set(id, {});
      ans = this.answers.get(id);
      Object.defineProperty(ans, 'answerCount', {
        enumerable: false,
        value: 0,
        writable: true,
        configurable: true
      });
    }
    ans.answerCount = ans.answerCount ? ans.answerCount + 1 : 1;

    questions.map(ques => {
      const q = toJS(ques);
      const { id: qid, options, type, content } = q;
      ans[qid] = ans[qid] || {};
      const tempQ = ans[qid];

      if (type === TEXT_TYPE) {
        if (content != null) {
          const answerCount = tempQ.answerCount ? tempQ.answerCount + 1 : 1;

          ans[qid].answerCount = answerCount;
        } else {
          ans[qid].answerCount = 0;
        }
      } else {
        options.forEach(option => {
          const { checked, id: oid } = option;
          if (checked) {
            const checkedCount = tempQ[oid] ? tempQ[oid] + 1 : 1;
            tempQ[oid] = checkedCount;
          }
        });
        ans[qid] = tempQ;
      }
    });
    console.log(this.answers);
  }

  @action setCurrentAnswerId(id) {
    this.currentAnswerId = id;
  }
  @computed get currentAnswer() {
    return this.answers.get(this.currentAnswerId);
  }
}

export default new Answers();
