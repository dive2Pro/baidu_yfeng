import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import {
  COLOR_BY_STATE,
  EXAM_DELETED,
  TEXT_BY_STATE,
  RELEASED,
  OUT_DATE
} from "../../constants/examStateType";
import { Link } from "react-router";
import DeleteModal from "../Modal/ConfirmModal";
import { CONFIRM_MODAL } from "../../constants/toggleTypes";
import Button from "../Button";

const CreateExamButton = ({ classname, onClick, text = "新建问卷" }) => {
  return <button className={classname} onClick={onClick}>{text}</button>;
};

const PublishStateText = ({ text, state }) => {
  return (
    <span style={COLOR_BY_STATE[state]}>{text || TEXT_BY_STATE[state]}</span>
  );
};
class ExamList extends Component {
  state = {};

  renderCraeteNewExam = () => (
    <div className="newlist">
      <CreateExamButton
        classname="newlistLarge"
        onClick={() => this.createNewExam()}
      />
    </div>
  );
  deleteExam = (...ids) => {
    const { changeExamStateFunc } = this.props;
    ids.forEach(id => changeExamStateFunc(id, EXAM_DELETED));
  };
  createNewExam = () => {
    const { router } = this.props;
    router.push(`/edit/new`);
  };
  handleDeleteConfirm = () => {
    const deletingExamId = this.state.deletingExamId;
    deletingExamId && this.deleteExam(...deletingExamId);
  };
  flatDateToString = time => {
    let timing = time;
    if (time instanceof Date) {
      timing = time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDay();
    }
    return timing;
  };

  renderExamItem = ({ examItem, message }) => {
    const { setExamCheckedFunc, toggleFunc } = this.props;
    const { titleId, time, examState, id: examId, checked } = examItem;
    const buttonUnClickable = examState === (RELEASED || OUT_DATE);
    let timing = this.flatDateToString(time);
    const title = message[titleId];
    return (
      <div key={examId} className="itemcontainer">
        <div>
          <input
            onChange={() => setExamCheckedFunc(!checked, examId)}
            type="checkbox"
            checked={checked}
            id={examId}
          />
          <label>
            <Link to={`/answer/${examId}`}>{title}</Link>
          </label>
        </div>
        <div>
          {timing}
        </div>
        <div>
          {PublishStateText({ state: examState })}
        </div>
        <div>
          <Button isUnClickable={buttonUnClickable}>
            <Link to={`/edit/${examId}`}>编辑</Link>
          </Button>
          <Button
            isUnClickable={buttonUnClickable}
            onhandleClick={() => {
              this.setState({
                deletingExamId: examId
              });
              toggleFunc(CONFIRM_MODAL);
            }}
          >
            删除
          </Button>
          <button>
            <Link to={`/show/${examId}`}>查看数据</Link>
          </button>
        </div>
      </div>
    );
  };

  rendernExamList = () => {
    const { exam, message: allMessages } = this.props;
    const { setExamCheckedFunc, toggleFunc } = this.props;
    return (
      <div>
        <div className="listtitle">
          <div className="itemcontainer">
            <div>标题</div>
            <div>时间</div>
            <div>状态</div>
            <div>
              <span>
                操作
              </span>
              <CreateExamButton
                classname="newlistMini"
                onClick={this.createNewExam}
              />
            </div>
          </div>
        </div>
        <div className="listcontent">
          <div className="listitems">
            {Object.keys(exam)
              .filter(key => exam[key].examState !== EXAM_DELETED)
              .map(key => {
                const examItem = exam[key];
                const message = allMessages[examItem.id];
                return this.renderExamItem({ message, examItem });
              })}
          </div>
          <div className="listbottom">
            <input
              onClick={() => {
                setExamCheckedFunc(this.allInp.checked, ...Object.keys(exam));
              }}
              ref={i => this.allInp = i}
              type="checkbox"
              id="all_check"
            />
            <label htmlFor="all_check">全选</label>
            <button
              onClick={() => {
                const waitingDeletes = Object.keys(exam).filter(
                  key => exam[key].checked
                );
                if (waitingDeletes.length > 0) {
                  this.setState({
                    deletingExamId: waitingDeletes
                  });
                  toggleFunc(CONFIRM_MODAL);
                  this.allInp.checked = false;
                }
              }}
            >
              删除
            </button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { exam } = this.props;
    const haveExam = exam &&
      Object.keys(exam).some(key => {
        return exam[key].examState !== EXAM_DELETED;
      });
    return (
      <div className="examlist">
        {!haveExam ? this.renderCraeteNewExam() : this.rendernExamList()}
        <DeleteModal confirmFunc={this.handleDeleteConfirm} />
      </div>
    );
  }
}
const mapStateToProps = (state, routerState) => {
  return {
    exam: state.exam,
    message: state.message,
    toggle: state.toggle,
    router: routerState.router
  };
};
const mapDispatchToProps = dispatch => ({
  setExamCheckedFunc: bindActionCreators(actions.setExamChecked, dispatch),
  changeExamStateFunc: bindActionCreators(actions.changeExamState, dispatch),
  geneExamFunc: bindActionCreators(actions.geneExam, dispatch),
  toggleFunc: bindActionCreators(actions.toggle, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
