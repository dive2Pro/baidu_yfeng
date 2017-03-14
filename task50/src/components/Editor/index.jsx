import React, { Component } from "react";
import ChoiceQuestion from "../ChoiceQuestion/index";
import * as topicTypes from "../../constants/topicType";
import * as examStateTypes from "../../constants/examStateType";
import {
  ADD_QUESTION,
  CURRENT_EXAM,
  CONFIRM_MODAL,
  WARNING_MODAL
} from "../../constants/toggleTypes";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
// import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { spring, Motion } from "react-motion";
import ConfirmModal from "../Modal/ConfirmModal";
import Button from "../Button";
import { Icon, DatePicker } from "antd";
import { inject, observer } from "mobx-react";
import { observable, autorun } from "mobx";
const moment = require("moment");

@inject("ExamStore")
@observer
class Editor extends Component {
  state = {};
  @observable _currentExam = null;
  @observable _showAddItemsView = false;
  @observable _showModal = [];

  _isAnswerMode = false;

  componentDidMount() {
    // const {
    //   setToggleIdFunc,
    //   exam,
    //   changeExamTimeFunc,
    //   newExamId,
    //   router,
    //   saveTempExamFunc,
    //   geneExamFunc
    // } = this.props;
    // console.info(router);
    // if (exam[newExamId]) {
    //   this.setState(
    //     {
    //       startDate: moment(exam[newExamId].time || {})
    //     },
    //     () => {
    //       changeExamTimeFunc(
    //         newExamId,
    //         this.state.startDate.format("YYYY-MM-DD")
    //       );
    //     }
    //   );
    //   setToggleIdFunc(CURRENT_EXAM, newExamId);
    // } else if (newExamId === "new") {
    //   geneExamFunc();
    //   this.setState({
    //     startDate: moment()
    //   });
    // } else {
    //   router.push("/list");
    // }
    // saveTempExamFunc();
  }

  componentWillUnmount() {}
  onToggle = question => ids => {
    const { toggle } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    this.setState(prevState => {
      return {
        [currentExamId]: {
          ...prevState[currentExamId],
          [question.id]: ids
        }
      };
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
    changeExamTimeFunc(toggle[CURRENT_EXAM], date.format("Y-M-D"));
  };

  geneQuestionsView() {
    const isAnswerMode = this._isAnswerMode;
    const currentExam = this._currentExam;
    const { questions } = currentExam;
    return questions && questions.values().map((ques, i) => {
        switch (ques.type) {
          case topicTypes.SINGLE_TYPE:
          case topicTypes.MULTI_TYPE:
            return (
              <div>
                <ChoiceQuestion
                  index={i}
                  key={ques.id}
                  isLast={i === questions.size - 1}
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
                isLast={i === questions.size - 1}
                thisQuestion={ques}
                requireable
                isAnswerMode={isAnswerMode}
              />
            );
          default:
            return "";
        }
      });
  }
  handleToggleFunc = type => {
    const {
      toggleFunc
    } = this.props;
    toggleFunc(type);
  };
  componentWillMount() {
    const { router, ExamStore } = this.props;
    const { params: { examId }, location: { pathname } } = router;
    this._currentExam = ExamStore.getExam(examId);
    this._isAnswerMode = pathname.indexOf("answer") >= 0;
  }
  toggleEditing = () => {
    this._currentExam.setEditing(!this._currentExam.isEditing);
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
  handleModalCancel = type => {
    this._showModal.remove(type);
  };
  renderModals = () => {
    console.log("renderModals", this._showModal);
    const showModal = this._showModal;
    return (
      <div className="modal-container">
        <ConfirmModal
          visible={~showModal.indexOf(topicTypes.SINGLE_TYPE)}
          onHandleOk={() => {
            console.log("----- confirmFunc");
            this.handleConfirmGeneQuestion(topicTypes.SINGLE_TYPE);
          }}
          onHandleCancel={() => this.handleModalCancel(topicTypes.SINGLE_TYPE)}
        >
          <div>
            <p>
              <input
                placeholder="请输入问题题目（单选）"
                ref={r => this["modal-" + topicTypes.SINGLE_TYPE] = r}
              />
            </p>
            <p>
              <input
                type="text"
                placeholder="请输入问题个数(最多10个)"
                ref={r => this["modal-" + topicTypes.SINGLE_TYPE + "count"] = r}
              />
            </p>
          </div>
        </ConfirmModal>
        <ConfirmModal
          visible={~showModal.indexOf(topicTypes.MULTI_TYPE)}
          onHandleOk={() => {
            this.handleConfirmGeneQuestion(topicTypes.MULTI_TYPE);
          }}
          onHandleCancel={() => this.handleModalCancel(topicTypes.MULTI_TYPE)}
        >
          <div>
            <p>
              <input
                placeholder="请输入问题题目（多选）"
                ref={r => this["modal-" + topicTypes.MULTI_TYPE] = r}
              />
            </p>
            <p>
              <input
                type="text"
                placeholder="请输入问题个数(最多10个)"
                ref={r => this["modal-" + topicTypes.MULTI_TYPE + "count"] = r}
              />
            </p>
          </div>

        </ConfirmModal>
        <ConfirmModal
          visible={~showModal.indexOf(topicTypes.TEXT_TYPE)}
          onHandleOk={() => {
            this.handleConfirmGeneQuestion(topicTypes.TEXT_TYPE);
          }}
          onHandleCancel={() => this.handleModalCancel(topicTypes.TEXT_TYPE)}
        >
          <div>
            <input
              placeholder="请输入问题题目（文字题）"
              ref={r => this["modal-" + topicTypes.TEXT_TYPE] = r}
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
          onHandleCancel={() => this.handleModalCancel(CONFIRM_MODAL)}
        >
          <div>
            <p>
              是否发布问卷?
            </p>
            <p>
              (此问卷截止日期为
              {this.state.startDate &&
                this.state.startDate.format("YYYY-MM-DD")}
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
    const title = this["modal-" + type].value;
    const countView = this["modal-" + type + "count"];
    let count = countView && +countView.value;
    if (Number.isNaN(count)) {
      count = 3;
    } else if (parseInt(count) > 10) {
      count = 10;
    } else if (parseInt(count) < 1) {
      count = 3;
    }
    console.log(title, count, "-------\n");
    this.handleModalCancel(type);
    // this.props.addQuestionFunc(title, topicTypes.SINGLE_TYPE, count);
    this._currentExam.addQuestion({ title, count, isRequire: true, type });
  };
  handleSubmit = () => {
    const {
      toggle,
      handleSubmitFunc
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const questionAnswer = this.state[currentExamId];
    questionAnswer && handleSubmitFunc(currentExamId, questionAnswer);
  };
  geneAnswerBottom = () => {
    return (
      <div className="editor-answer-bottom">
        <Button onhandleClick={this.handleSubmit}>提交</Button>
      </div>
    );
  };
  geneEditorBottom = () => {
    const memeIcons = ["⭕", "⬜", "📝"];
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
            }}
          >
            {({ op, display }) => (
              <div
                style={{
                  opacity: op,
                  flex: op,
                  display: display ? "flex" : "none"
                }}
                className="editor-addquestion-items"
              >
                {Object.keys(topicArr).map((type, index) => {
                  return (
                    <Button
                      key={index}
                      onhandleClick={() => {
                        this._showModal.push(type);
                      }}
                    >
                      {memeIcons[index] + "  " + topicArr[type]}
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
            }}
          >
            <Icon style={{ fontSize: "20px" }} type="plus-circle-o" />
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
                }
              }}
            >
              保存问卷
            </Button>
            <Button
              onhandleClick={() => {
                {
                  /*toggleFunc(CONFIRM_MODAL);*/
                }
              }}
            >
              发布问卷
            </Button>
          </div>
        </div>
      </div>
    );
  };
}

class ModalContainer extends React.Component {
  render() {
    return <div>asd</div>;
  }
}

export default Editor;
