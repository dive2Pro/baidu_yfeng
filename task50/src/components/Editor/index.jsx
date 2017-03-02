import React, { Component } from 'react';
import ChoiceQuestion from '../ChoiceQuestion/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as topicTypes from '../../constants/topicType';
import { ADD_QUESTION, SELECT_DATE } from '../../constants/toggleTypes';
import classnames from 'classnames';
import Modal from '../Modal/index';
import TextQuestion from '../TextQuestion/index';
class Editor extends Component {
  componentDidUpdate() {
    this.addDiv.addEventListener('transitionend', _ => {
      this.transform = '';
    });
  }

  geneQuestionsView() {
    const { question, message, saveMessageFunc } = this.props;
    console.info(this.props);
    return Object.keys(question).map((q, i) => {
      const ques = question[q];
      switch (ques.type) {
        case topicTypes.SINGLE_TYPE:
        case topicTypes.MULTI_TYPE:
          return (
            <ChoiceQuestion
              index={i}
              saveMessageFunc={saveMessageFunc}
              key={ques.id}
              question={ques}
              message={message}
            />
          );
        case topicTypes.TEXT_TYPE:
          return (
            <TextQuestion
              index={i}
              saveMessageFunc={saveMessageFunc}
              key={ques.id}
              question={ques}
              message={message}
            />
          );
        default:
          return '';
      }
    });
  }
  mockSingle = type => {
    const { addQuestionFunc, saveMessageFunc } = this.props;
    addQuestionFunc('title', type);
  };
  render() {
    const { toggleFunc, toggle } = this.props;

    const itemsClazz = classnames('editor-addquestion-items', {
      active: toggle[ADD_QUESTION]
    });

    const addDivClazz = classnames('editor-addquestion-add', {
      active: toggle[ADD_QUESTION]
    });

    const topicArr = topicTypes.arr;

    return (
      <div className="editor">
        <div className="editor-title" />
        <div className="editor-questions">
          {this.geneQuestionsView()}
        </div>
        <div className="editor-addquestion">
          <div className={itemsClazz} ref={p => this.addItemsDiv = p}>
            {Object.keys(topicArr).map((type, index) => {
              return (
                <button key={index} onClick={() => this.mockSingle(type)}>

                  {/*<button key={index} onClick={() => toggleFunc(type)}>*/}
                  {topicArr[type]}
                </button>
              );
            })}
          </div>
          <div
            ref={d => this.addDiv = d}
            className={addDivClazz}
            onClick={() => toggleFunc(ADD_QUESTION)}
          >
            {' '}＋　添加问题
          </div>
        </div>
        <div className="editor-bottom">
          <div>
            <span>问卷截止日期</span>
            <input type="text" ref={r => this.selectDate = r} />
          </div>

          <div>
            <button>保存问卷</button>
            <button>发布问卷</button>
          </div>
        </div>
        <Modal
          cancelFunc={() => toggleFunc(topicTypes.SINGLE_TYPE)}
          active={toggle[topicTypes.SINGLE_TYPE]}
        >
          <div>
            <div>请输入问题题目（单选）</div>
            <input type="text" />
          </div>

        </Modal>
        <Modal
          cancelFunc={() => toggleFunc(topicTypes.MULTI_TYPE)}
          active={toggle[topicTypes.MULTI_TYPE]}
        >
          <div>
            <div>请输入问题题目（多选）</div>
            <input type="text" />
          </div>

        </Modal>
        <Modal
          cancelFunc={() => toggleFunc(topicTypes.TEXT_TYPE)}
          active={toggle[topicTypes.TEXT_TYPE]}
        >
          <div>
            <div>请输入问题题目（文字题）</div>

          </div>

        </Modal>
        <Modal
          cancelFunc={() => toggleFunc(topicTypes.TEXT_TYPE)}
          active={toggle[topicTypes.TEXT_TYPE]}
        >
          <div>
            <div>请输入问题题目（文字题）</div>

          </div>

        </Modal>
        <Modal
          cancelFunc={() => toggleFunc(topicTypes.TEXT_TYPE)}
          active={toggle[SELECT_DATE]}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  toggle: state.toggle,
  message: state.message,
  question: state.question
});
const mapDispatchToProps = dispatch => {
  return {
    toggleFunc: bindActionCreators(actions.toggle, dispatch),
    addQuestionFunc: bindActionCreators(actions.addQuestion, dispatch),
    saveMessageFunc: bindActionCreators(actions.saveMessage, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
