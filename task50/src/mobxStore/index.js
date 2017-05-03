/**
 * Created by hyc on 17-3-14.
 */
import * as examStateTypes from '../constants/examStateType';
import { computed, action, observable, observer, reaction } from 'mobx';
import { guid } from '../constants/utils';
import { NEW_GENE, UN_RELEASE, RELEASED } from '../constants/examStateType';
import * as optionActs from '../constants/optionActType';
import * as topics from '../constants/topicType';
import answerStore from './AnswerStore';
class ExamListStore {
  @observable exams;
  constructor() {
    this.exams = new Map();
    this.loadExams();
  }
  loadExams() {
    initialData.forEach(data => {
      this.updateExam(data);
    });
  }

  updateExam(data) {
    let exam = this.exams.get(data.id);
    if (!exam) {
      exam = new Exam(this, data.id);
      this.exams.set(exam.id, exam);
    }
    if (data.examState === examStateTypes.EXAM_DELETED) {
      this.deleteExams(exam.id);
    } else {
      exam.updateFromJson(data);
    }
  }

  @action createExam() {
    const exam = new Exam(this);
    this.exams.set(exam.id, exam);
    return exam;
  }

  @action deleteExams(...ids) {
    ids.forEach(id => {
      this.exams.delete(id);
    });
  }
  getExam(id) {
    return this.exams.get(id);
  }
  @action clear() {
    this.exams.clear();
  }
  @computed get isEmptyStore() {
    return this.exams.size < 1;
  }
}

class Exam {
  id = null;
  store = null;
  @observable title = '请修改';
  @observable questions = [];
  @observable examState = NEW_GENE;
  @observable time = null;
  @observable isEditing = false;
  tempExam = {};
  constructor(store, id = guid()) {
    this.store = store;
    this.id = id;
    this.tempExam = {};
    if (!this.id) {
      this.id = guid();
    }
    reaction(
      () => this.isEditing,
      whenEditing => {
        if (whenEditing) {
          this.updateWithTempExam(this.tempExam, this);
        } else {
          this.updateWithTempExam(this, this.tempExam);
        }
      }
    );
  }
  @action setEditing(editing) {
    this.isEditing = editing;
  }

  temperToBackExam() {
    if (this.isEditing) {
      this.updateWithTempExam(this, this.tempExam);
    }
    this.questions.forEach(question => {
      question.clearState();
    });
  }

  updateWithTempExam(target, source) {
    target.title = source.title;
    target.questions = [...source.questions];
    target.examState = source.examState;
    target.time = source.time;
  }

  confirmChange() {
    this.updateWithTempExam(this, this.tempExam);
  }

  saveToAnswer = () => {
    answerStore.saveAnswer(this);
  };
  updateFromJson(json) {
    Object.keys(json).forEach(id => {
      if (id == 'questions') {
        const questions = json[id];
        questions.forEach(ques => {
          let q = this.questions.find(q => q.id === ques.id);
          if (!q) {
            q = new Question(this, ques.id, ques.title);
            this.questions.push(q);
          }
          q.updateFromJson(ques);
        });
      } else {
        this[id] = json[id];
      }
    });
  }

  @action changeTitle(content) {
    this.title = content && content;
    console.log('this  title = ' + this.title);
  }

  /**
   * export const questionActs = { '上移': -1, '下移': 1, '复用': 0, '删除': 2 };
   */
  @action changeQuestion({ index, actType }) {
    const question = this.questions[index];
    switch (parseInt(actType)) {
      case 0:
        const newQuestion = new Question(this);
        newQuestion.updateFromJson(question);
        this.questions.push(newQuestion);
        console.log(newQuestion);
        break;
      case 1:
      case -1:
        changePositionInArray(this.questions, index, +actType);
        break;
      case 2:
        this.deleteQuestion(index);
        break;
      default:
        return this.questions;
    }
  }
  @computed get questionsCount() {
    return this.questions.size;
  }

  @action addQuestion(questionInfo) {
    const question = new Question(this);
    console.log(questionInfo);
    question.updateFromJson(questionInfo);
    this.questions.push(question);
  }

  @action deleteQuestion(index) {
    this.questions.splice(index, 1);
  }
  @action changeExamState(examState) {
    this.examState = examState;
    this.updateWithTempExam(this.tempExam, this);
  }

  deleteExam() {
    this.id && this.store.delete(this.id);
  }

  @action setStopTime(time) {
    this.time = time;
  }
  @computed get asJson() {
    return {
      id: this.id,
      time: this.time,
      questions: this.questionsId
    };
  }
}
function changePositionInArray(arr, index, actPosition) {
  if (!arr[index + actPosition]) {
    return false;
  }
  const temp = arr[index];
  arr[index] = arr[index + actPosition];
  arr[index + actPosition] = temp;
}
class Question {
  @observable title = '请输入';
  id;
  @observable options = [];
  @observable content;
  @observable isRequire = false;
  @observable type = '';
  exam = null;
  constructor(exam, id = guid()) {
    this.exam = exam;
    this.id = id;
  }
  @action deleteOption(index) {
    // deleteElementFromArray(this.options,)
    this.options.splice(index, 1);
  }
  resetOptions() {
    this.options.forEach(option => {
      option.resetChecked();
    });
  }
  toggleOptionWithId(id) {
    const option = this.options.find(option => option.id == id);
    option.toggleChecked();
  }
  toggleChecked = toption => {
    this.options.forEach(option => {
      if (toption.id !== option.id) {
        option.resetChecked();
      } else {
        option.toggleChecked();
      }
    });
  };
  @action updateContent(content) {
    this.content = content;
  }

  changeQuestion(info) {
    this.exam.changeQuestion(info);
  }
  @computed get selectedOptionsValue() {
    return this.options.filter(option => option.checked).map(option => {
      return option.title;
    });
  }

  @action clearState = () => {
    this.content = '';
    this.options.forEach(option => {
      option.resetChecked();
    });
  };
  /**
   * @param index
   * @param actType
   */
  changeOptionPosition(index, actType) {
    switch (+actType) {
      case optionActs.LOWER:
      case optionActs.UPPER:
        changePositionInArray(this.options, index, +actType);
        break;
    }
  }
  deleteQuestion(index) {
    this.exam.deleteQuestion(index);
  }
  @action setQuestionRequire(isRequire) {
    this.isRequire = isRequire;
  }
  setQuestionTitle(title) {
    this.title = title;
  }
  @action updateFromJson({ title = '请输入', count, options, isRequire = false, type = '' }) {
    this.title = title || '请输入';
    this.isRequire = isRequire;
    this.type = type;
    if (!count) {
      options &&
        options.forEach(opt => {
          let option = this.options.find(o => o.id === opt.id);
          if (!option) {
            option = new Option(this);
            this.options.push(option);
          }
          option.updateFromJson(opt);
        });
    } else {
      new Array(count).fill(null).forEach(() => {
        const option = new Option(this);
        this.options.push(option);
      });
    }
  }
}

class Option {
  @observable title = '请输入';
  @observable id;
  @observable checked = false;
  question = null;

  constructor(question, id = guid()) {
    this.question = question;
    this.id = id;
  }
  updateFromJson({ title }) {
    this.title = title;
  }

  @action setOptionTitle(title) {
    this.title = title;
  }
  @action toggleChecked() {
    this.checked = !this.checked;
  }
  @action resetChecked() {
    this.checked = false;
  }
}

const questions = (function() {
  let questions = [];
  for (let i = 0; i++ < 4; ) {
    const q = new Question(exam1);
    questions.push(q);
    const quesJson = {
      title: '请输入',
      count: i + 1,
      isRequire: false,
      type: i == 2 ? topics.TEXT_TYPE : topics.SINGLE_TYPE
    };
    if (i == 3) quesJson.type = topics.MULTI_TYPE;
    q.updateFromJson(quesJson);
  }
  return questions;
})(exam1);

const exam1 = {
  examState: examStateTypes.UN_RELEASE,
  title: 't1',
  time: '2017-9-10',
  questions: questions,
  id: 'e1'
};

const initialData = [
  exam1,
  {
    examState: examStateTypes.RELEASED,
    title: 't2',
    time: '2014-9-10',
    questionsId: ['q1', 'q2', 'q3'],
    id: 'e2'
  },
  {
    examState: examStateTypes.OUT_DATE,
    title: 't3',
    time: '2015-9-10',
    questionsId: ['q1', 'q2', 'q3'],
    id: 'e3'
  }
];

export default new ExamListStore();
