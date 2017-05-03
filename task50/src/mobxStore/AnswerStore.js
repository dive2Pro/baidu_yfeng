import { toJS, computed, action, observable } from 'mobx';
import { TEXT_TYPE } from '../constants/topicType';
class Answers {
  answers = new observable.map();
  @observable currentAnswerId: '';

  @action saveAnswer(exam) {
    const { id, questions } = exam;
    let ans = this.answers.get(id);
    if (!ans) {
      this.answers.set(id, {});
      ans = this.answers.get(id);
    }
    ans.answerCount = ans.answerCount ? ans.answerCount + 1 : 1;

    questions.map(ques => {
      const q = toJS(ques);
      const { id: qid, options, type, content } = q;
      const tempQ = ans[qid] || {};

      if (type === TEXT_TYPE) {
        if (content !== '') {
          const checkedCount = tempQ[qid] ? tempQ[qid] + 1 : 1;

          ans[qid] = checkedCount;
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
