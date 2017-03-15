/**
 * Created by hyc on 17-3-14.
 */
import * as examStateTypes from "../constants/examStateType";
import { computed, action, observable, observer, reaction } from "mobx";
import { guid } from "../constants/utils";
import { NEW_GENE, UN_RELEASE, RELEASED } from "../constants/examStateType";
import * as optionActs from "../constants/optionActType";
import AnswerStore from "./AnswerStore";
import {SINGLE_TYPE,MULTI_TYPE,TEXT_TYPE}from '../constants/topicType'
const initialData = [
  {
    examState: examStateTypes.UN_RELEASE,
    title: "t1",
    time: "2017-9-10",
    questions: [
      {
        id: "q1",
        title: "hello",
        type:SINGLE_TYPE,
        options: [
          { id: "o1", title: "o1" },
          { id: "o2", title: "o2222222" },
          { id: "o3", title: "o3333333" }
        ]
      },
      {
        id: "q2",
        title: "hello2",
        type:MULTI_TYPE,        
        options: [
          { id: "o1", title: "o1" },
          { id: "o2", title: "o2222222" },
          { id: "o3", title: "o3333333" }
        ]
      },
      {
        id: "q3",
        title: "hello123",
        type:MULTI_TYPE,        
        options: [
          { id: "o11", title: "o11" },
          { id: "o21", title: "1111o2222222" },
          { id: "o33", title: "33333333o3333333" }
        ]
      },
      {
        id: "q2",
        title: "hello123",
        type:TEXT_TYPE
      }
    ],
    id: "e1"
  },
  {
    examState: examStateTypes.RELEASED,
    title: "t2",
    time: "2014-9-10",
    questions: ["q1", "q2", "q3"],
    id: "e2"
  },
  {
    examState: examStateTypes.OUT_DATE,
    title: "t3",
    time: "2015-9-10",
    questions: ["q1", "q2", "q3"],
    id: "e3"
  }
];

class ExamListStore {
  @observable exams;
  answerStore = {};
  constructor(answerStore) {
    this.exams = new Map();
    this.answerStore = answerStore;
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
  saveAnswerToServer(examAnswerInfo) {
    this.answerStore.saveAnswerToServer(examAnswerInfo);
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
  @observable title = "请修改";
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
        console.log(this.isEditing);
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
      this.confirmChange(this, this.tempExam);
    }
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
  updateFromJson(json) {
    Object.keys(json).forEach(id => {
      if (id == "questions") {
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
    console.log("this  title = " + this.title);
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
    return this.questions.length;
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

  commitAnswer() {
    const uploading = this.store.saveAnswerToServer(this.asAnswer);
  }
  @computed get asAnswer() {
    return {
      id: this.id,
      title: this.title,
      questions: this.questions.map(q => q.asAnswer())
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
  @observable title = "请输入";
  id;
  @observable options = [];
  @observable content;
  @observable isRequire = false;
  @observable type = "";
  exam = null;
  constructor(exam, id = guid()) {
    this.exam = exam;
    this.id = id;
  }
  @action deleteOption(index) {
    // deleteElementFromArray(this.options,)
    this.options.splice(index, 1);
  }

  @action updateContent(content) {
    this.content = content;
  }

  changeQuestion(info) {
    this.exam.changeQuestion(info);
  }
  getOptions() {
    return this.options;
  }

  @action setSelectOption(indexs) {
    this.options.forEach((o, i) => {
      const fo = indexs.includes(i);
      o.setChecked(fo);
    });
  }
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
  @action updateFromJson(
    { title = "请输入", count, options, isRequire = false, type = "" }
  ) {
    this.title = title || "请输入";
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
  asAnswer() {
    return {
      title: this.title,
      id: this.id,
      type: this.type,
      options: this.options.map(o => o.asAnswer()),
      content: this.content
    };
  }
}

class Option {
  @observable title = "请输入";
  @observable id;
  @observable isChecked = false;
  question = null;

  constructor(question, id = guid()) {
    this.question = question;
    this.id = id;
  }
  updateFromJson({ title }) {
    this.title = title;
  }
  setChecked(checkd) {
    this.isChecked = checkd;
  }

  @action setOptionTitle(title) {
    this.title = title;
  }

  asAnswer() {
    const t = { ...this };
    this.setChecked(false);
    return t;
  }
}
export default new ExamListStore(AnswerStore);
