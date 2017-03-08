/**
 * Created by hyc on 17-3-8.
 */
import React from "react";
import QuestionHOC from "./index";
import { shallow } from "enzyme";
const component = ({ ...rest }) => {
  return (
    <div>
      Hello
    </div>
  );
};

describe("Question component", () => {
  test("Question init with default answerMode = false", () => {
    const QuestionComponent = QuestionHOC(component());
    const initProps = {
      thisQuestion: {
        titleId: "t1",
        id: "q1",
        require: true
      },
      message: {
        t1: "omg"
      }
    };
    const question = shallow(<QuestionComponent {...initProps} />);
    expect(question.find({className:'question-title'}).length).toEqual(1);
    expect(question.find({className:'question-act'}).length).toEqual(1);
    expect(question.find({className:'question-title-require'}).length).toEqual(1);
  });
  test("Question init with default answerMode = false", () => {
    const QuestionComponent = QuestionHOC(component());
    const initProps = {
      thisQuestion: {
        titleId: "t1",
        id: "q1",
        require: true
      },
      message: {
        t1: "omg"
      }

    };
    const question = shallow(<QuestionComponent {...initProps} isAnswerMode />);
    expect(question.find({className:'question-title'}).length).toEqual(1);
    expect(question.find({className:'question-act'}).length).toEqual(0);
    expect(question.find({className:'question-title-require'}).length).toEqual(0);
  });
  test("Question is require", () => {
    const QuestionComponent = QuestionHOC(component());
    const initProps = {
      thisQuestion: {
        titleId: "t1",
        id: "q1",
        require: true
      },
      message: {
        t1: "omg"
      }
    };

    const question = shallow(<QuestionComponent {...initProps}  />);
    expect(question.find(`input[type="checkbox"][checked=true]`).length).toEqual(1);
   });
  test("Question is not require", () => {
    const QuestionComponent = QuestionHOC(component());
    const initProps = {
      thisQuestion: {
        titleId: "t1",
        id: "q1",
        require: false
      },
      message: {
        t1: "omg"
      }
    };
    const question = shallow(<QuestionComponent {...initProps}  />);
    const findNOde = question.find(`input[type="checkbox"][checked=false]`);
    expect(findNOde.props().checked).toEqual(false);
  });
});
