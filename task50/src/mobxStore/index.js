/**
 * Created by hyc on 17-3-14.
 */
import * as examStateTypes from "../constants/examStateType";
import { computed, action, observable, observer } from "mobx";
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
class ExamModel {
  @observable exams;
  constructor() {
    this.exams = new Map();
    initialData.forEach(data => {
      this.exams.set(data.id, data);
    });
  }

  @action saveExam(exam) {
    this.exams.set(exam.id, exam);
  }

  @action updateProperty({ examId, properName, content }) {
    if (this.exams.has(examId)) {
      const currentExam = this.exams.get(examId);
      this.exams.set(examId, { ...currentExam, [properName]: content });
    }
  }

  @action deleteExams(...ids) {
    ids.forEach(id => {
      this.exams.delete(id);
    });
  }

  @action clear() {
    this.exams.clear();
  }
  @computed get isEmptyStore() {
    return this.exams.size < 1;
  }
}

export default ExamModel;
