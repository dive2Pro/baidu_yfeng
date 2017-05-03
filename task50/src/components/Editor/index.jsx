import React, { Component } from 'react';
import ChoiceQuestion from '../ChoiceQuestion/index';
import * as topicTypes from '../../constants/topicType';
import * as examStateTypes from '../../constants/examStateType';
import { CURRENT_EXAM, CONFIRM_MODAL, WARNING_MODAL } from '../../constants/toggleTypes';
import TextQuestion from '../TextQuestion/index';
import EditorTitle from './title';
import { spring, Motion } from 'react-motion';
import ConfirmModal from '../Modal/ConfirmModal';
import Button from '../Button';
import { Icon, DatePicker, InputNumber, Input, notification, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { observable, autorun } from 'mobx';
const moment = require('moment');
const confirm = Modal.confirm;
const openSaveFinished = msg => {
  notification.open({
    message: '提醒',
    description: msg
  });
};

@inject('ExamStore')
@observer
class Editor extends Component {
  state = {};
  @observable _currentExam = null;
  @observable _showAddItemsView = false;
  @observable _showModal = [];

  _isAnswerMode = false;

  componentWillMount() {
    const { router, ExamStore } = this.props;
    const { params: { examId }, location: { pathname } } = router;
    this._currentExam = ExamStore.getExam(examId);
    this._isAnswerMode = pathname.indexOf('answer') >= 0;
  }

  componentDidMount() {
    const { router } = this.props;
    if (!this._currentExam) router.push('/list');
    if (!this._isAnswerMode) {
      this._currentExam.setEditing(true);
    }
  }

  componentWillUnmount() {
    if (!this._isAnswerMode) {
      this._currentExam.temperToBackExam();
    }
  }

  onToggle = question =>
    id => {
      question.toggleOptionWithId(id);
    };
  showConfirm = () => {
    const { router } = this.props;
    const that = this;
    confirm({
      title: '确定?',
      content: '回答完毕,是否继续作答?',
      onOk() {
        that._currentExam.temperToBackExam();
      },
      onCancel() {
        router.goBack();
      }
    });
  };
  handleDateChange = date => {
    this.setState({
      startDate: date
    });
    const {
      changeExamTimeFunc,
      toggle
    } = this.props;
    changeExamTimeFunc(toggle[CURRENT_EXAM], date.format('Y-M-D'));
  };

  geneQuestionsView = () => {
    const isAnswerMode = this._isAnswerMode;
    const currentExam = this._currentExam;
    const { questions } = currentExam;
    return questions &&
      questions.map((ques, i) => {
        const isLast = i === questions.length - 1;
        switch (ques.type) {
          case topicTypes.SINGLE_TYPE:
          case topicTypes.MULTI_TYPE:
            return (
              <div>
                <ChoiceQuestion
                  index={i}
                  key={ques.id}
                  isLast={isLast}
                  thisQuestion={ques}
                  isAnswerMode={isAnswerMode}
                  onHandleChange={this.onToggle(ques)}
                />
              </div>
            );
          case topicTypes.TEXT_TYPE:
            return (
              <TextQuestion
                index={i}
                key={ques.id}
                isLast={isLast}
                thisQuestion={ques}
                requireable
                isAnswerMode={isAnswerMode}
              />
            );
          default:
            return '';
        }
      });
  };

  handleToggleFunc = type => {
    const {
      toggleFunc
    } = this.props;
    toggleFunc(type);
  };

  toggleEditing = () => {
    this._currentExam.setEditing(!this._currentExam.isEditing);
  };

  handleModalCancel = type => {
    this._showModal.remove(type);
  };
  handleQuestionNumbers = type =>
    count => {
      this[type + 'numbers'] = count;
    };
  handleQuestionTitle = type =>
    e => {
      this[type + 'title'] = e.target.value;
    };
  renderModals = () => {
    const showModal = this._showModal;
    return (
      <div className="modal-container">
        {[topicTypes.SINGLE_TYPE, topicTypes.MULTI_TYPE].map(type => (
          <ConfirmModal
            visible={~showModal.indexOf(type)}
            onHandleOk={() => {
              this.handleConfirmGeneQuestion(type);
            }}
            onHandleCancel={() => this.handleModalCancel(type)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <Input
                size="large"
                placeholder={`请输入问题题目（${type === topicTypes.SINGLE_TYPE ? '单选' : '多选'}）`}
                onChange={this.handleQuestionTitle(type)}
              />
              <InputNumber min={3} max={10} onChange={this.handleQuestionNumbers(type)} />
            </div>
          </ConfirmModal>
        ))}

        <ConfirmModal
          visible={~showModal.indexOf(topicTypes.TEXT_TYPE)}
          onHandleOk={() => {
            this.handleConfirmGeneQuestion(topicTypes.TEXT_TYPE);
          }}
          onHandleCancel={() => this.handleModalCancel(topicTypes.TEXT_TYPE)}>
          <div>
            <Input
              placeholder="请输入问题题目（文字题）"
              ref={r => this['modal-' + topicTypes.TEXT_TYPE] = r}
            />
          </div>
        </ConfirmModal>
        <ConfirmModal
          visible={~showModal.indexOf(CONFIRM_MODAL)}
          onHandleOk={() => {
            this._currentExam.changeExamState(examStateTypes.RELEASED);
            this.handleModalCancel(CONFIRM_MODAL);
            this.props.router.go(-1);
          }}
          onHandleCancel={() => this.handleModalCancel(CONFIRM_MODAL)}>
          <div>
            <p>
              是否发布问卷?
            </p>
            <p>
              (此问卷截止日期为
              {this.state.startDate && this.state.startDate.format('YYYY-MM-DD')}
              )
            </p>
          </div>
        </ConfirmModal>
        <ConfirmModal visible={showModal[WARNING_MODAL]}>
          <div />
        </ConfirmModal>
      </div>
    );
  };
  handleConfirmGeneQuestion = type => {
    const title = this[type + 'title'] || '';
    let count = this[type + 'numbers'] || 3;
    this[type + 'numbers'] = null;
    this[type + 'title'] = '';
    if (Number.isNaN(count)) {
      count = 3;
    } else if (parseInt(count) > 10) {
      count = 10;
    } else if (parseInt(count) < 1) {
      count = 3;
    }
    this.handleModalCancel(type);
    // this.props.addQuestionFunc(title, topicTypes.SINGLE_TYPE, count);
    this._currentExam.addQuestion({ title, count, isRequire: true, type });
  };

  handleSubmit = () => {
    const currentExamId = this._currentExam.id;
    this._currentExam.saveToAnswer();
    this.showConfirm('问卷回答完毕');
  };

  geneAnswerBottom = () => {
    return (
      <div className="editor-answer-bottom">
        <Button onhandleClick={this.handleSubmit}>提交</Button>
      </div>
    );
  };
  geneEditorBottom = () => {
    const memeIcons = ['⭕', '⬜', '📝'];
    const topicArr = topicTypes.arr;

    const itemsActive = this._showAddItemsView;
    const currentExam = this._currentExam;

    return (
      <div>
        <div className="editor-addquestion">
          <Motion
            defaultStyle={{ op: 0, display: 0 }}
            style={{
              op: spring(itemsActive ? 1 : 0),
              display: spring(itemsActive ? 1 : 0)
            }}>
            {({ op, display }) => (
              <div
                style={{
                  opacity: op,
                  flex: op,
                  display: display ? 'flex' : 'none'
                }}
                className="editor-addquestion-items">
                {Object.keys(topicArr).map((type, index) => {
                  return (
                    <Button
                      key={index}
                      onhandleClick={() => {
                        this._showModal.push(type);
                      }}>
                      {memeIcons[index] + '  ' + topicArr[type]}
                    </Button>
                  );
                })}
              </div>
            )}
          </Motion>
          <div
            href="#"
            key="editor-AddQuestion"
            className="editor-addquestion-add"
            onClick={() => {
              this._showAddItemsView = !this._showAddItemsView;
            }}>
            <Icon style={{ fontSize: '20px' }} type="plus-circle-o" />
            添加问题
          </div>
        </div>
        <div className="editor-bottom">
          <div className="editor-bottom-left">
            <span>问卷截止日期:</span>
            <DatePicker
              dateFormat="YYYY-MM-DD"
              value={this.state.startDate}
              defaultValue={this.state.startDate}
              onChange={this.handleDateChange}
              disabledDate={t => {
                return t && t.valueOf() < Date.now();
              }}
              allowClear={false}
            />
          </div>
          <div>
            <Button
              onhandleClick={() => {
                {
                  currentExam.changeExamState(examStateTypes.UN_RELEASE);
                  openSaveFinished('问卷保存完毕');
                }
              }}>
              保存问卷
            </Button>
            <Button
              onhandleClick={() => {
                {
                  this._showModal.push(CONFIRM_MODAL);
                }
              }}>
              发布问卷
            </Button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { router } = this.props;
    const currentExam = this._currentExam;
    if (!currentExam) return <div>...</div>;
    const isAnswerMode = this._isAnswerMode;
    return (
      <div className="editor">
        <EditorTitle
          currentExam={currentExam}
          handleGoback={() => router.go(-1)}
          isAnswerMode={isAnswerMode}
        />
        <div className="editor-questions">
          {this.geneQuestionsView()}
        </div>
        {!isAnswerMode ? this.geneEditorBottom() : this.geneAnswerBottom()}
        {this.renderModals()}

      </div>
    );
  }
}

export default Editor;
