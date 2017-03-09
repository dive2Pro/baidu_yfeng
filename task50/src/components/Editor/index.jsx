import React, { Component } from "react";
import ChoiceQuestion from "../ChoiceQuestion/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import * as topicTypes from "../../constants/topicType";
import * as examStateTypes from "../../constants/examStateType";
import {
  saveTempExam,
  restoreTempExam,
  handleSubmit
} from "../../actions/answer";
import {
  ADD_QUESTION,
  CURRENT_EXAM,
  CONFIRM_MODAL,
  ANSWER_MODE,
  WARNING_MODAL
} from "../../constants/toggleTypes";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
// import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { spring, Motion } from "react-motion";
import ConfirmModal from "../Modal/ConfirmModal";
import { deleteElementFromArray } from "../../constants/utils";
const DatePicker = require("react-datepicker");
const moment = require("moment");
require("react-datepicker/dist/react-datepicker.css");

class Editor extends Component {
  componentDidMount() {
    const {
      setToggleIdFunc,
      exam,
      changeExamTimeFunc,
      newExamId,
      router,
      saveTempExamFunc,
      geneExamFunc
    } = this.props;

    if (exam[newExamId]) {
      this.setState(
        {
          startDate: moment(exam[newExamId].time || {})
        },
        () => {
          changeExamTimeFunc(
            newExamId,
            this.state.startDate.format("YYYY-MM-DD")
          );
        }
      );
      setToggleIdFunc(CURRENT_EXAM, newExamId);
    } else if (newExamId === "new") {
      geneExamFunc();
      this.setState({
        startDate: moment()
      });
    } else {
      router.push("/list");
    }
    saveTempExamFunc();
  }

  componentWillUnmount() {
    const {
      setToggleIdFunc,
      resetToggledFunc,
      restoreTempExamFunc
    } = this.props;
    restoreTempExamFunc();
    setToggleIdFunc(CURRENT_EXAM, null);
    resetToggledFunc(ADD_QUESTION);
  }

  state = {};

  /**
   *
   * @param question
   */
  onToggle = question =>
    /**
     *
     * @param id optionsId
     * @param index  optionsIds position
     * @param checked
     *
     */
    (id, index, checked) => {
      const { toggle } = this.props;
      const currentExamId = toggle[CURRENT_EXAM];
      this.setState(prevState => {
        let selectOptions = (prevState[currentExamId] &&
          prevState[currentExamId][question.id]) || [];
        switch (question.type) {
          case topicTypes.SINGLE_TYPE:
            selectOptions = [id];
            break;
          case topicTypes.MULTI_TYPE:
            if (!checked) {
              selectOptions = deleteElementFromArray(selectOptions, id);
            } else {
              selectOptions.push(id);
            }
            break;
        }
        return {
          [currentExamId]: {
            ...prevState[currentExamId],
            [question.id]: selectOptions
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
    const {
      question,
      exam,
      toggle,
      message
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const currentExam = exam[currentExamId];
    if (!currentExam) {
      return <div>...</div>;
    }
    const quesIds = currentExam ? currentExam.questionsId : [];
    const isAnswerMode = toggle[ANSWER_MODE];
    return quesIds &&
      quesIds.map((q, i) => {
        const ques = question[q];
        const title = "";
        switch (ques.type) {
          case topicTypes.SINGLE_TYPE:
          case topicTypes.MULTI_TYPE:
            return (
              <ChoiceQuestion
                index={i}
                key={q}
                isLast={i === quesIds.length - 1}
                thisQuestion={ques}
                currentExamId={currentExamId}
                isAnswerMode={isAnswerMode}
                onToggle={this.onToggle(ques)}
                title={title}
                message={message}
              />
            );
          case topicTypes.TEXT_TYPE:
            return (
              <TextQuestion
                index={i}
                key={q}
                isLast={i === quesIds.length - 1}
                thisQuestion={ques}
                requireable
                currentExamId={currentExamId}
                isAnswerMode={isAnswerMode}
                title={title}
                message={message}
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

  render() {
    const {
      toggle,
      saveExamFunc,
      exam,
      isAnswerMode,
      router,
      temp,
      saveMessageFunc,
      message
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const currentExam = exam[currentExamId];
    if (!currentExam) return <div>...</div>;
    return (
      <div className="editor">
        <EditorTitle
          currentExam={currentExam}
          handleGoback={() => router.go(-1)}
          isAnswerMode={isAnswerMode}
          titleId={currentExam.titleId}
          title={message[currentExam.titleId]}
          saveMessageFunc={saveMessageFunc}
        />
        <div className="editor-questions">
          {this.geneQuestionsView()}
        </div>
        {!isAnswerMode ? this.geneEditorBottom() : this.geneAnswerBottom()}
        <div className="modal-container">
          <ConfirmModal
            actType={topicTypes.SINGLE_TYPE}
            confirmFunc={() => {
              this.handleConfirmGeneQuestion(topicTypes.SINGLE_TYPE);
            }}
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
                  ref={r =>
                    this["modal-" + topicTypes.SINGLE_TYPE + "count"] = r}
                />
              </p>
            </div>
          </ConfirmModal>
          <ConfirmModal
            actType={topicTypes.MULTI_TYPE}
            confirmFunc={() => {
              this.handleConfirmGeneQuestion(topicTypes.MULTI_TYPE);
            }}
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
                  ref={r =>
                    this["modal-" + topicTypes.MULTI_TYPE + "count"] = r}
                />
              </p>
            </div>

          </ConfirmModal>
          <ConfirmModal
            actType={topicTypes.TEXT_TYPE}
            confirmFunc={() => {
              this.handleConfirmGeneQuestion(topicTypes.TEXT_TYPE);
            }}
          >
            <div>
              <input
                placeholder="请输入问题题目（文字题）"
                ref={r => this["modal-" + topicTypes.TEXT_TYPE] = r}
              />
            </div>
          </ConfirmModal>
          <ConfirmModal
            confirmFunc={() => {
              saveExamFunc(currentExamId, examStateTypes.RELEASED);
              router.go(-1);
            }}
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
          <ConfirmModal actType={WARNING_MODAL}>
            <div>
              {temp.warning}
            </div>
          </ConfirmModal>
        </div>

      </div>
    );
  }
  handleConfirmGeneQuestion = type => {
    const title = this["modal-" + type].value;
    const countView = this["modal-" + type + "count"];
    let count = countView && countView.value;
    if (Number.isNaN(count)) {
      count = 3;
    } else if (parseInt(count) > 10) {
      count = 10;
    } else if (parseInt(count) < 1) {
      count = 3;
    }
    this.props.addQuestionFunc(title, topicTypes.SINGLE_TYPE, count);
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
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    );
  };
  geneEditorBottom = () => {
    const {
      toggle,
      saveExamFunc,
      toggleFunc,
      router
    } = this.props;
    const memeIcons = ["⭕", "⬜", "📝"];
    const topicArr = topicTypes.arr;
    const itemsActive = toggle[ADD_QUESTION];
    const currentExamId = toggle[CURRENT_EXAM];

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
                    <button
                      key={index}
                      onClick={() => this.handleToggleFunc(type)}
                    >
                      {memeIcons[index] + "  " + topicArr[type]}
                    </button>
                  );
                })}
              </div>
            )}
          </Motion>
          <div
            key="editor-AddQuestion"
            className="editor-addquestion-add"
            onClick={() => toggleFunc(ADD_QUESTION)}
          >
            <h2>＋　添加问题</h2>
          </div>
        </div>
        <div className="editor-bottom">
          <div className="editor-bottom-left">
            <span>问卷截止日期:</span>
            <DatePicker
              dateFormat="YYYY-MM-DD"
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              minDate={moment()}
            />
          </div>
          <div>
            <button
              onClick={() => {
                saveExamFunc(currentExamId, examStateTypes.UN_RELEASE);
              }}
            >
              保存问卷
            </button>
            <button
              onClick={() => {
                toggleFunc(CONFIRM_MODAL);
              }}
            >
              发布问卷
            </button>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, routerState) => {
  const newExamId = routerState.params.examId;
  return {
    toggle: state.toggle,
    message: state.message[newExamId],
    question: state.question,
    exam: state.exam,
    newExamId: newExamId,
    isAnswerMode: routerState.location.pathname.indexOf("/answer") === 0,
    router: routerState.router,
    temp: state.temp
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleFunc: bindActionCreators(actions.toggle, dispatch),
    addQuestionFunc: bindActionCreators(actions.addQuestion, dispatch),
    saveExamFunc: bindActionCreators(actions.saveExam, dispatch),
    saveMessageFunc: bindActionCreators(actions.saveMessage, dispatch),
    setToggleIdFunc: bindActionCreators(actions.setToggleId, dispatch),
    changeExamTimeFunc: bindActionCreators(actions.changeExamTime, dispatch),
    geneExamFunc: bindActionCreators(actions.geneExam, dispatch),
    saveTempExamFunc: bindActionCreators(saveTempExam, dispatch),
    restoreTempExamFunc: bindActionCreators(restoreTempExam, dispatch),
    handleSubmitFunc: bindActionCreators(handleSubmit, dispatch),
    resetToggledFunc: bindActionCreators(actions.resetToggled, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
