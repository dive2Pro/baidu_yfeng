import React, { Component } from "react"; 
const defaultExamId = "e1"; 
import ChoiceChart from "../ChoiceChart/index";
import Button from '../Button'
import {observer,inject} from 'mobx-react'
@inject('AnswerStore')
@observer
class ExamShow extends Component {
  geneContent = () => {
    return <div>"lala"</div>;
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
    const {router}=this.props;
    const newExamId = router.params.examId;

    if (!newExamId) {
      router.push("/list");
    }
  }

  render() {
   
    return<div className="examshow">
          <div className="title">
            <h1>
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
      }
}

export default (ExamShow);
