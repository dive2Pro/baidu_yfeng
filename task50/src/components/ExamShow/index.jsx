import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as topicTypes from "../../constants/topicType";
import Chart from "../Chart/Chart";
const defaultExamId = "e1";
import * as actions from "../../actions/index";
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
      switch (type) {
        case topicTypes.SINGLE_TYPE:
          const pieData = answerWithThisQuestion;
          return (
            <Chart
              key={i}
              type={"pie"}
              width={300}
              height={300}
              showTooltips={true}
              data={pieData}
            />
          );
        case topicTypes.MULTI_TYPE:
          const barData = [];
          console.log(questionsAnswerInfo);
          for (let i in answerWithThisQuestion) {
            barData.push({ xValue: i, yValue: answerWithThisQuestion[i] });
          }
          console.log(barData);

          return (
            <Chart
              key={i}
              type={"bar"}
              width={500}
              height={500}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              showTooltips={true}
              data={barData}
            />
          );
        case topicTypes.TEXT_TYPE:
          const key = Object.keys(answerWithThisQuestion)[0];
          console.log(key);
          const dogutData = {
            有效回答: answerWithThisQuestion[key],
            无效填写: answerCount - answerWithThisQuestion[key]
          };
          console.log(dogutData);
          return (
            <Chart
              key={i}
              type={"pie"}
              width={300}
              height={300}
              showTooltips={true}
              data={dogutData}
              innerRadius={80}
            />
          );
        default:
          return <div key={i} />;
      }
    });
  };
  render() {
    const { exam, message } = this.props;
    const { titleId } = exam[defaultExamId];
    return (
      <div className="examshow">
        <div className="title">
          {message[titleId]}
          <div className="title-subtitle">
            此统计分析只包含完整回收的数据
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
