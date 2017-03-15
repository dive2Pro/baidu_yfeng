import React, { Component } from "react"; 
const defaultExamId = "e1"; 
import ChoiceChart from "../ChoiceChart/index";
import Button from '../Button'
import {observer,inject} from 'mobx-react'
@inject('AnswerStore')
@observer
class ExamShow extends Component {
  geneContent = () => {
    const { AnswerStore } = this.props;
    const examAnserInfo = AnswerStore.updateFromServer(this.examId);
    if(!examAnserInfo){
      return <div>数据为空!</div>;
    }
    const {id,count,title,questions} = examAnserInfo;
    
    const currentAllQuestions = questions;
    const answerCount = count;

    return currentAllQuestions.map((question, i) => {
      return (
        <ChoiceChart
          key={question.id}
          index={i}
          question={question}
          answerCount={answerCount}
        />
      );
    });
  };
  handleGoBack = () => {
    const { router } = this.props;
    router.go(-1);
  };
  
  componentWillMount() {
    const {router}=this.props;
    const newExamId = router.params.examId;
    this.examId = newExamId;
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
