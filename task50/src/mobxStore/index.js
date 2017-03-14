/**
 * Created by hyc on 17-3-14.
 */
import * as examStateTypes from "../constants/examStateType";
import { computed, action, observable, observer, reaction } from "mobx";
import { guid, deleteElementFromArray } from "../constants/utils";
import { NEW_GENE } from "../constants/examStateType";
const initialData = [
  {
    examState: examStateTypes.UN_RELEASE,
    title: "t1",
    time: "2017-9-10",
    questionsId: ["q1", "q2", "q3"],
    id: "e1"
  },
  {
    examState: examStateTypes.RELEASED,
    title: "t2",
    time: "2014-9-10",
    questionsId: ["q1", "q2", "q3"],
    id: "e2"
  },
  {
    examState: examStateTypes.OUT_DATE,
    title: "t3",
    time: "2015-9-10",
    questionsId: ["q1", "q2", "q3"],
    id: "e3"
  }
];

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
  @observable title = "请修改";
  @observable questions = Map;
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
    this.questions = new Map();
    this.questions.set("q1", { id: "q1", title: "I am Q1" });
    this.questions.set("q2", { id: "q2", title: "I am Q2" });
    this.questions.set("q3", { id: "q3", title: "I am Q3" });
  }
  @action setEditing(editing) {
    this.isEditing = editing;
  }

  updateWithTempExam(target, source) {
    target.title = source.title;
    target.questions = new Map(source.questions);
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
            this.questions.Set(q.id, q);
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

  @action changeQuestion({ quesId, actType }) {
    switch (parseInt(actType)) {
      case 0:
        break;
      case 1:
        break;
      case -1:
        break;
      case 2:
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
    question.updateFromJson(...questionInfo);
    this.questions.set(question.id, question);
  }

  @action deleteQuestion(quesId) {
    this.questions.delete(quesId);
  }
  @action changeExamState(examState) {
    this.examState = examState;
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

class Question {
  @observable title;
  @observable id;
  @observable options;
  @observable content;
  @observable isRequire = false;
  @observable type = "";
  exam = null;
  constructor(exam, id = guid()) {
    this.exam = exam;
    this.id = id;
    this.options = new Map();
  }
  @action deleteOption(id) {
    this.options.delete(id);
  }

  @action updateContent(content) {
    this.content = content;
  }
  changeOptionPosition(id, actType) {
    switch (+actType) {
    }
  }
  deleteQuestion() {
    this.exam.deleteQuestion(this.id);
  }
  @action setQuestionRequire(isRequire) {
    this.isRequire = isRequire;
  }
  updateFromJson({ title = "请输入", options, isRequire = false, type = "" }) {
    this.title = title;
    this.isRequire = isRequire;
    this.type = type;
    options &&
      options.forEach(opt => {
        let option = this.options.find(o => o.id === opt.id);
        if (!option) {
          option = new Option(this, option.id);
          this.options.set(option.id, option);
        }
        option.updateFromJson(opt);
      });
  }
}

class Option {
  @observable title;
  @observable id;
  question = null;

  constructor(question, id = guid()) {
    this.id = id;
    this.question = question;
  }
  updateFromJson({ title }) {
    this.title = title;
  }
  @action setOptionTitle(title) {
    this.title = title;
  }

  deleteFromQuestion() {
    this.question.deleteOption(this.id);
  }

  changeOptionPosition(actType) {
    this.question.changeOptionPosition(this.id, actType);
  }
}
export default new ExamListStore();
