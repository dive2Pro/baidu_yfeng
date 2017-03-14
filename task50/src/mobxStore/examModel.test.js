/**
 * Created by hyc on 17-3-14.
 */
import ExamModel from "./index";
import _ from "lodash";
describe("Test ExamModel with Mobx", () => {
  let em;
  let exams;
  beforeEach(() => {
    em = new ExamModel();
    exams = em.exams.toJS();
  });
  test("init examModel", () => {
    expect(em.exams.toJS()).toEqual({});
  });
  test("saveExam examModel", () => {
    const exam = {
      id: "e1",
      title: "Ni hao a "
    };
    em.saveExam(exam);
    const expectObj = {
      e1: exam
    };
    expect(em.exams.toJS()).toEqual(expectObj);
  });
  test("saveExam examModel", () => {
    const exam = {
      id: "e1",
      title: "Ni hao a "
    };
    em.saveExam(exam);
    const expectObj = {
      e1: exam
    };
    expect(em.exams.toJS()).toEqual(expectObj);
  });
  test("updateProperty with  examModel", () => {
    const exam = {
      id: "e1",
      title: "Ni hao a ",
      questionsId: [2, 3, 4]
    };
    em.saveExam(exam);

    const actions = [
      em.updateProperty({ examId: "e1", properName: "title", content: "Hyc" }),
      em.updateProperty({
        examId: "e1",
        properName: "content",
        content: "Hyc"
      }),
      em.updateProperty({ examId: "e2", properName: "title", content: "Hyc" }),
      em.updateProperty({
        examId: "e1",
        properName: "questionsId",
        content: [1, 2, 3, 4]
      })
    ];
    const expectObj = {
      e1: {
        id: "e1",
        title: "Hyc",
        content: "Hyc",
        questionsId: [1, 2, 3, 4]
      }
    };
    // em.exams = arr.map(id => {
    //   return em.exams.get(id)
    // });
    // todo;
    // expect( em.exams.get("e1")).toMatchObject(expectObj.e1);
  });
  test("deleteExams with  examModel", () => {
    const exam = {
      id: "e1",
      title: "Ni hao a "
    };
    const exam2 = {
      id: "e5",
      title: "e555555555"
    };
    em.saveExam(exam);
    em.saveExam(exam2);

    const actions = [em.deleteExams(...["e1", "e2", "e3"])];
    const expectObj = {
      e5: {
        id: "e5",
        title: "e555555555"
      }
    };
    expect(em.exams.toJS()).toEqual(expectObj);
  });
  test("clear with  examModel", () => {
    const exam = {
      id: "e1",
      title: "Ni hao a "
    };
    const exam2 = {
      id: "e5",
      title: "e555555555"
    };
    em.saveExam(exam);
    em.saveExam(exam2);

    const actions = [em.clear(...["e1", "e2", "e3"])];
    const expectObj = {};
    expect(em.exams.toJS()).toEqual(expectObj);
  });
});
