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
  CONFIRM_MODAL
} from "../../constants/toggleTypes";
import classnames from "classnames";
import Modal from "../Modal/index";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
// import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import { spring, TransitionMotion, Motion } from "react-motion";
import ConfirmModal from "../Modal/ConfirmModal";

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
      router
    } = this.props;
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
                {...this.props}
              />
            );
          default:
            return "";
        }
      });
  }
  mockSingle = type => {
    const {
      addQuestionFunc
    } = this.props;
    addQuestionFunc("title", type);
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
  render() {
    const {
      toggleFunc,
      toggle,
      saveExamFunc,
      exam
    } = this.props;
    const currentExamId = toggle[CURRENT_EXAM];
    const itemsClazz = classnames("editor-addquestion-items");
    const memeIcons = ["⭕", "⬜", "📝"];
    const topicArr = topicTypes.arr;
    const itemsActive = toggle[ADD_QUESTION];
    return (
      <div className="editor">
        <EditorTitle {...this.props} currentExam={exam[currentExamId]} />
        <div className="editor-questions">
          {this.geneQuestionsView()}
        </div>

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
                className={itemsClazz}
                ref={p => this.addItemsDiv = p}
              >
                {Object.keys(topicArr).map((type, index) => {
                  return (
                    <button key={index} onClick={() => this.mockSingle(type)}>
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
    );
  }
}
const mapStateToProps = (state, routerState) => {
  console.log(routerState);
  return {
    toggle: state.toggle,
    message: state.message,
    question: state.question,
    exam: state.exam,
    newExamId: routerState.params.examId,
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
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
