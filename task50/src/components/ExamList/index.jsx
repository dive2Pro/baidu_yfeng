import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import {
  COLOR_BY_STATE,
  EXAM_DELETED,
  TEXT_BY_STATE
} from "../../constants/examStateType";
import { Link } from "react-router";

const CreateExamButton = ({ classname, onClick, text = "新建问卷" }) => {
  return <button className={classname} onClick={onClick}>{text}</button>;
};

const PublishStateText = ({ text, state }) => {
  return (
    <span style={COLOR_BY_STATE[state]}>{text || TEXT_BY_STATE[state]}</span>
  );
};
class ExamList extends Component {
  deleteExam = (...ids) => {
    const { changeExamStateFunc } = this.props;
    ids.forEach(id => changeExamStateFunc(id, EXAM_DELETED));
  };
  createNewExam = () => {
    const { router } = this.props;
    router.push(`/edit/new`);
  };

  render() {
    const {
      setExamCheckedFunc,
      exam,
      toggle,
      message
    } = this.props;
    const haveExam = exam && Object.keys(exam).length > 0;
    return (
      <div className="examlist">
        {!haveExam
          ? <div className="newlist">
              <CreateExamButton
                classname="newlistLarge"
                onClick={() => this.createNewExam()}
              />
            </div>
          : <div>
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
                      onClick={() => this.createNewExam()}
                    />
                  </div>
                </div>
              </div>
              <div className="listcontent">
                <div className="listitems">
                  {Object.keys(exam)
                    .filter(key => {
                      return exam[key].examState !== EXAM_DELETED;
                    })
                    .map((key, i) => {
                      const {
                        titleId,
                        time,
                        examState,
                        id,
                        checked
                      } = exam[key];
                      const title = message[titleId];
                      return (
                        <div key={key} className="itemcontainer">
                          <div>
                            <input
                              onChange={() => setExamCheckedFunc(!checked, key)}
                              type="checkbox"
                              checked={checked}
                              id={key}
                            />
                            <label>
                              <Link to={`/edit/${key}`}>{title}</Link>
                            </label>
                          </div>
                          <div>{time}</div>
                          <div>
                            {PublishStateText({ state: examState })}
                          </div>
                          <div>
                            <button><Link to={`/edit/${key}`}>编辑</Link></button>
                            <button onClick={() => this.deleteExam(key)}>
                              删除
                            </button>
                            <button>
                              {" "}<Link to={`/show/${key}`}>查看数据</Link>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="listbottom">
                  <input
                    onClick={() => {
                      setExamCheckedFunc(
                        this.allInp.checked,
                        ...Object.keys(exam)
                      );
                    }}
                    ref={i => this.allInp = i}
                    type="checkbox"
                    id="all_check"
                  />
                  <label htmlFor="all_check">全选</label>
                  <button
                    onClick={() => {
                      this.deleteExam(
                        ...Object.keys(exam).filter(key => exam[key].checked)
                      );
                      this.allInp.checked = false;
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>}
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
  geneExamFunc: bindActionCreators(actions.geneExam, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
