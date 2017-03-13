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
  WARNING_MODAL
} from "../../constants/toggleTypes";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
// import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { spring, Motion } from "react-motion";
import ConfirmModal from "../Modal/ConfirmModal";
import Button from "../Button";
import { Icon, DatePicker } from "antd";

const moment = require("moment");

class Editor extends Component {
  state = {};

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
    const {
      question,
      exam,
      toggle,
      message,
      isAnswerMode
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const currentExam = exam[currentExamId];
    if (!currentExam) {
      return <div>...</div>;
    }
    const quesIds = currentExam ? currentExam.questionsId : [];
    return quesIds &&
      quesIds.map((q, i) => {
        const ques = question[q];
        const title = message[ques.titleId];
        switch (ques.type) {
          case topicTypes.SINGLE_TYPE:
          case topicTypes.MULTI_TYPE:
            return (
              <div>
                <ChoiceQuestion
                  index={i}
                  key={q}
                  isLast={i === quesIds.length - 1}
                  thisQuestion={ques}
                  currentExamId={currentExamId}
                  isAnswerMode={isAnswerMode}
                  onHandleChange={this.onToggle(ques)}
                  message={message}
                  title={title}
                />
              </div>
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
        <Button onhandleClick={this.handleSubmit}>提交</Button>
      </div>
    );
  };
  geneEditorBottom = () => {
    const {
      toggle,
      saveExamFunc,
      toggleFunc
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
                    <Button
                      key={index}
                      onhandleClick={() => this.handleToggleFunc(type)}
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
            onClick={() => toggleFunc(ADD_QUESTION)}
          >
            <Icon style={{ fontSize: "20px" }} type="plus-circle-o" />
            {"    "}
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
                saveExamFunc(currentExamId, examStateTypes.UN_RELEASE);
              }}
            >
              保存问卷
            </Button>
            <Button
              onhandleClick={() => {
                toggleFunc(CONFIRM_MODAL);
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

const mapStateToProps = (state, routerState) => {
  const newExamId = routerState.params.examId;
  const answerMode = routerState.location.pathname.indexOf("answer") > -1;
  answerMode && console.log("answerMode = " + answerMode, routerState);
  return {
    toggle: state.toggle,
    message: state.message[newExamId],
    question: state.question,
    exam: state.exam,
    newExamId: newExamId,
    isAnswerMode: answerMode,
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
