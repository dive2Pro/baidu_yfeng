import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const defaultExamId = "e1";
import * as actions from "../../actions/index";
import ChoiceChart from "../ChoiceChart/index";
import Button from '../Button'
class ExamShow extends Component {
  geneContent = () => {
    const { answer, exam, message, question, newExamId, router } = this.props;
    const currentAnswer = answer[newExamId];
    if (!currentAnswer) {
      return <div>数据为空!</div>;
    }
    const currentExam = exam[newExamId];
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
  handleGoBack = () => {
    const { router } = this.props;
    router.go(-1);
  };
  componentDidMount() {
    const { newExamId, router, exam } = this.props;
    if (!newExamId || !exam[newExamId]) {
      router.push("/list");
    }
  }
  render() {
    const { newExamId, exam, message } = this.props;
    const currentExam = exam[newExamId];
    return currentExam
      ? <div className="examshow">
          <div className="title">
            <h1>
              {message[currentExam.titleId]}
            </h1>
            <div className="title-subtitle">
              <h4>此统计分析只包含完整回收的数据</h4>
            </div>
          </div>
          <div className="showContent">
            {this.geneContent()}
          </div>
          <div className="showBottom">
            <Button className="showBottom-button"
                    onhandleClick={this.handleGoBack}>
              返回
            </Button>
          </div>
        </div>
      : <div />;
  }
}

const mapStateToProps = (state, routerState) => {
  const newExamId = routerState.params.examId;
  return {
    toggle: state.toggle,
    message: state.message[newExamId],
    question: state.question,
    exam: state.exam,
    answer: state.answer,
    user: state.user,
    newExamId,
    router: routerState.router
  };
};
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
