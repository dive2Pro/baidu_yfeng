import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import ChoiceChart from '../ChoiceChart/index';
import Button from '../Button';
// import {} from 'mobx'
import { observer, inject } from 'mobx-react';

@inject('AnswerStore', 'ExamStore')
@observer
class ExamShow extends Component {
  geneContent = () => {
    const { AnswerStore, ExamStore } = this.props;
    const newExamId = this.newExamId;
    const currentAnswer = AnswerStore.currentAnswer;
    if (!currentAnswer) {
      return <div>数据为空!</div>;
    }
    const { questions } = ExamStore.getExam(newExamId);

    return questions.map((q, i) => {
      const questionAnswer = currentAnswer[q.id];
      return <ChoiceChart key={i} index={i} question={q} answer={questionAnswer} />;
    });
  };
  handleGoBack = () => {
    const { router } = this.props;
    router.go(-1);
  };
  componentWillMount() {
    const { router, AnswerStore } = this.props;
    const newExamId = router.params.examId;
    this.newExamId = newExamId;
    AnswerStore.setCurrentAnswerId(newExamId);
  }
  componentDidMount() {
    const { router, AnswerStore } = this.props;
    const newExamId = this.newExamId;
    if (!newExamId || !AnswerStore.currentAnswer) {
      router.push('/list');
    }
  }
  render() {
    const { ExamStore } = this.props;
    const currentExamId = this.newExamId;
    const currentExam = ExamStore.getExam(currentExamId);
    return currentExam
      ? <div className="examshow">
          <div className="title">
            <h1>
              {currentExam.titleId}
            </h1>
            <div className="title-subtitle">
              <h4>此统计分析只包含完整回收的数据</h4>
            </div>
          </div>
          <div className="showContent">
            {this.geneContent()}
          </div>
          <div className="showBottom">
            <Button className="showBottom-button" onhandleClick={this.handleGoBack}>
              返回
            </Button>
          </div>
        </div>
      : <div />;
  }
}

export default ExamShow;
