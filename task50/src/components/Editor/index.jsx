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
  CURRENT_EXAM
} from "../../constants/toggleTypes";
import classnames from "classnames";
import Modal from "../Modal/index";
import TextQuestion from "../TextQuestion/index";
import EditorTitle from "./title";
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
    //todo 现在是所以question都被渲染，应该是exam所属的question
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
                isLast={i === quesIds.length - 1}
                saveMessageFunc={saveMessageFunc}
                opeExamQuestionsFunc={opeExamQuestionsFunc}
                key={ques.id}
                question={ques}
                message={message}
                currentExamId={currentExamId}
              />
            );
          case topicTypes.TEXT_TYPE:
            return (
              <TextQuestion
                index={i}
                isLast={i === quesIds.length - 1}
                saveMessageFunc={saveMessageFunc}
                opeExamQuestionsFunc={opeExamQuestionsFunc}
                key={ques.id}
                question={ques}
                message={message}
                currentExamId={currentExamId}
                requireable={true}
                setRequireFunc={setRequireFunc}
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
  render() {
    const {
      toggleFunc,
      toggle,
      saveExamFunc,
      exam
    } = this.props;
    const { currentExamId } = exam;
    const itemsClazz = classnames("editor-addquestion-items", {
      active: toggle[ADD_QUESTION]
    });
    const addDivClazz = classnames("editor-addquestion-add", {
      active: toggle[ADD_QUESTION]
    });
    const topicArr = topicTypes.arr;
    return (
      <div className="editor">
        <EditorTitle currentExam={exam[currentExamId]} {...this.props} />
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
            {" "}＋　添加问题
          </div>
        </div>
        <div className="editor-bottom">
          <div>
            <span>问卷截止日期</span>
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
            <button
              onClick={() =>
                saveExamFunc(currentExamId, examStateTypes.RELEASED)}
            >
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
