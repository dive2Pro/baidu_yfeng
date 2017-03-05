import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as topicTypes from "../../constants/topicType";
import Chart from "../Chart/Chart";
const defaultExamId = "e1";
import * as actions from "../../actions/index";
import ChoiceChart from "../ChoiceChart/index";
class ExamShow extends Component {
  geneContent = () => {
    const { answer, exam, message, question } = this.props;
    const currentAnswer = answer[defaultExamId];
    const currentExam = exam[defaultExamId];
    const currentAllQuestions = currentExam.questionsId;
    const questionsAnswerInfo = currentAnswer.questions;
    const answerInfo = {};
    currentAllQuestions.forEach((q, i) => {
      answerInfo[q] = questionsAnswerInfo[q] || 0;
    });
    const answerCount = currentAnswer.userIds.length;

    return currentAllQuestions.map((q, i) => {
      const fullQuestionInfo = question[q];
      const { type } = fullQuestionInfo;
      const answerWithThisQuestion = questionsAnswerInfo[q];
      return (
        <ChoiceChart
          key={i}
          index={i}
          answer={answerWithThisQuestion}
          question={fullQuestionInfo}
          message={message}
          answerCount={answerCount}
        />
      );
    });
  };
  render() {
    const { exam, message } = this.props;
    const { titleId } = exam[defaultExamId];
    return (
      <div className="examshow">
        <div className="title">
          <h1>
            {message[titleId]}
          </h1>
          <div className="title-subtitle">
            <h4>此统计分析只包含完整回收的数据</h4>
          </div>
        </div>
        <div className="showContent">
          {this.geneContent()}
        </div>
        <div className="showBottom">
          <button>
            返回
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toggle: state.toggle,
  message: state.message,
  question: state.question,
  exam: state.exam,
  answer: state.answer,
  user: state.user
});
const mapDispatchToProps = dispatch => {
  return {
    toggleFunc: bindActionCreators(actions.toggle, dispatch),
    addQuestionFunc: bindActionCreators(actions.addQuestion, dispatch),
    saveMessageFunc: bindActionCreators(actions.saveMessage, dispatch),
    saveExamFunc: bindActionCreators(actions.saveExam, dispatch),
    setToggleIdFunc: bindActionCreators(actions.setToggleId, dispatch),
    opeExamQuestionsFunc: bindActionCreators(
      actions.opeExamQuestions,
      dispatch
    ),
    setRequireFunc: bindActionCreators(actions.setRequire, dispatch),
    changeExamStateFunc: bindActionCreators(actions.changeExamState, dispatch),
    changeExamTimeFunc: bindActionCreators(actions.changeExamTime, dispatch),
    geneExamFunc: bindActionCreators(actions.geneExam, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamShow);
