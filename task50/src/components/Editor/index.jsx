import React, { Component } from "react";
import ChoiceQuestion from "../ChoiceQuestion/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import * as topicTypes from "../../constants/topicType";
import * as examStateTypes from "../../constants/examStateType";
import {
  ADD_QUESTION,
  SELECT_DATE,
  CURRENT_EXAM,
  CONFIRM_MODAL,
  ANSWER_MODE
} from "../../constants/toggleTypes";
import classnames from "classnames";
import Modal from "../Modal/index";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
// import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { spring, TransitionMotion, Motion } from "react-motion";
import ConfirmModal from "../Modal/ConfirmModal";
import { deleteElementFromArray } from "../../constants/utils";
var DatePicker = require("react-datepicker");
var moment = require("moment");
require("react-datepicker/dist/react-datepicker.css");

class Editor extends Component {
  componentDidMount() {
    const {
      setToggleIdFunc,
      exam,
      changeExamTimeFunc,
      geneExamFunc,
      newExamId,
      router,
      toggleFunc,
      isAnswerMode
    } = this.props;

    if (isAnswerMode) toggleFunc(ANSWER_MODE);
    if (exam[newExamId]) {
      this.setState(
        {
          startDate: moment(exam[newExamId].time || {})
        },
        () => {
          changeExamTimeFunc(newExamId, this.state.startDate.format("Y-M-D"));
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
     */
    (id, index, checked) => {
      console.log("onToggle!", id, index, checked);
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
      message,
      saveMessageFunc,
      opeExamQuestionsFunc,
      exam,
      setRequireFunc,
      toggle
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const quesIds = exam[currentExamId] ? exam[currentExamId].questionsId : [];
    const isAnswerMode = toggle[ANSWER_MODE];
    return quesIds &&
      quesIds.map((q, i) => {
        const ques = question[q];
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
                {...this.props}
              />
            );
          case topicTypes.TEXT_TYPE:
            return (
              <TextQuestion
                index={i}
                key={q}
                isLast={i === quesIds.length - 1}
                thisQuestion={ques}
                requireable={true}
                currentExamId={currentExamId}
                isAnswerMode={isAnswerMode}
                {...this.props}
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
  willEnter = () => {
    return {
      height: 0,
      opacity: 1
    };
  };

  willLeave = () => {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  };
  handleDeleteConfirm = () => {};
  handleGeneConfirm = () => {
    console.log(this);
  };
  render() {
    const {
      toggleFunc,
      toggle,
      saveExamFunc,
      exam,
      isAnswerMode,
      addQuestionFunc
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    return (
      <div className="editor">
        <EditorTitle
          isAnswerMode={toggle[ANSWER_MODE]}
          {...this.props}
          currentExam={exam[currentExamId]}
        />
        <div className="editor-questions">
          {this.geneQuestionsView()}
        </div>
        {!isAnswerMode ? this.geneEditorBottom() : this.geneAnswerBottom()}
        <div className="modal-container">
          <ConfirmModal
            actType={topicTypes.SINGLE_TYPE}
            confirmFunc={() => {
              console.info(this.handleGeneConfirm());
              const title = this["modal-" + topicTypes.SINGLE_TYPE].value;
              const count = this[
                "modal-" + topicTypes.SINGLE_TYPE + "count"
              ].value;
              addQuestionFunc(
                title,
                topicTypes.MULTI_TYPE,
                parseInt(count) || 3
              );
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
                  placeholder="请输入问题个数"
                  ref={r =>
                    this["modal-" + topicTypes.SINGLE_TYPE + "count"] = r}
                />
              </p>
            </div>

          </ConfirmModal>
          <ConfirmModal
            actType={topicTypes.MULTI_TYPE}
            confirmFunc={() => {
              const title = this["modal-" + topicTypes.MULTI_TYPE].value;
              const count = this[
                "modal-" + topicTypes.MULTI_TYPE + "count"
              ].value;
              addQuestionFunc(
                title,
                topicTypes.MULTI_TYPE,
                parseInt(count) || 3
              );
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
                  placeholder="请输入问题个数"
                  ref={r =>
                    this["modal-" + topicTypes.MULTI_TYPE + "count"] = r}
                />
              </p>
            </div>

          </ConfirmModal>
          <ConfirmModal
            actType={topicTypes.TEXT_TYPE}
            confirmFunc={() => {
              const title = this["modal-" + topicTypes.TEXT_TYPE].value;
              addQuestionFunc(title, topicTypes.TEXT_TYPE);
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
            confirmFunc={() =>
              saveExamFunc(currentExamId, examStateTypes.RELEASED)}
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
        </div>

      </div>
    );
  }
  handleSubmit = () => {
    const { exam, question, toggle, message, saveAnswerFunc } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const questionsAnswer = this.state[currentExamId]; //{e1:{},q2:{}}
    if (!questionsAnswer) {
      return;
    }
    const currentExam = exam[currentExamId];
    //todo filter require
    let hasRequireQustionDidntAnswer = false;
    let t_question = {};
    currentExam.questionsId.some(qid => {
      t_question = question[qid];
      if (t_question.require) {
        hasRequireQustionDidntAnswer = !questionsAnswer[qid] ||
          questionsAnswer[qid].keyLength < 1;
        return true;
      }
      return false;
    });
    if (hasRequireQustionDidntAnswer) {
      alert("该问题必须回答: " + message[t_question.titleId]);
      return;
    }
    const shakedAnswer = Object.keys(questionsAnswer)
      .filter(key => questionsAnswer[key].length > 0)
      .map(qId => ({ qId: questionsAnswer[qId] }));
    const hasRequireQuestionUnAnswer = currentExam.questionsId.length >
      shakedAnswer.length;
    currentExam.questionsId.some(qId => {
      return qId.length;
    });
    // 过滤
    const contentIdNotNullQuestions = currentExam.questionsId
      .filter(qid => {
        return question[qid].type === topicTypes.TEXT_TYPE;
      })
      .filter(qid => {
        return message[question[qid].contentId];
      })
      .map(qid => ({
        [qid]: [question[qid].contentId]
      }));
    console.info(contentIdNotNullQuestions);
    let questions = {};
    contentIdNotNullQuestions.forEach(q => {
      questions = { ...questionsAnswer, ...q };
    });
    saveAnswerFunc({ answer: { examId: currentExamId, questions } });
  };
  geneAnswerBottom = () => {
    return (
      <div className="editor-answer-bottom">
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    );
  };
  geneEditorBottom = () => {
    const { toggle, saveExamFunc, toggleFunc } = this.props;
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
                ref={p => this.addItemsDiv = p}
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
            ref={d => this.addDiv = d}
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
            />
          </div>

          <div>
            <button
              onClick={() =>
                saveExamFunc(currentExamId, examStateTypes.UN_RELEASE)}
            >
              保存问卷
            </button>
            <button onClick={() => toggleFunc(CONFIRM_MODAL)}>
              发布问卷
            </button>
          </div>
        </div>
      </div>
    );
  };
}
const mapStateToProps = (state, routerState) => {
  return {
    toggle: state.toggle,
    message: state.message,
    question: state.question,
    exam: state.exam,
    newExamId: routerState.params.examId,
    isAnswerMode: routerState.location.pathname.indexOf("/answer") === 0,
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
    geneExamFunc: bindActionCreators(actions.geneExam, dispatch),
    saveAnswerFunc: bindActionCreators(actions.saveAnswer, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
