import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import { EXAM_DELETED } from "../../constants/examStateType";
import classnames from "classnames";
class ExamList extends Component {
  deleteExam = (...ids) => {
    const { changeExamStateFunc } = this.props;
    ids.forEach(id => changeExamStateFunc(id, EXAM_DELETED));
  };
  render() {
    const {
      setExamCheckedFunc,
      exam,
      toggle,
      message
    } = this.props;

    return (
      <div className="examlist">
        <div className="newlist">
          <button className="newlistLarge">
            新建问卷
          </button>
        </div>
        <div className="listtitle">
          <div className="itemcontainer">
            <div>标题</div>
            <div>时间</div>
            <div>状态</div>
            <div>
              <span>
                操作
              </span>
              <button className="newlistMini">
                新建问卷
              </button>
            </div>
          </div>
        </div>
        <div className="listcontent">
          <div className="listitems">
            {Object.keys(exam)
              .filter(key => exam[key].examState !== EXAM_DELETED)
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
                  <div key={id} className="itemcontainer">
                    <div>
                      <input
                        onChange={() => setExamCheckedFunc(!checked, key)}
                        type="checkbox"
                        checked={checked}
                        id={key}
                      />
                      <label htmlFor={key}>
                        {title}
                      </label>
                    </div>
                    <div>{time}</div>
                    <div>
                      {examState}
                    </div>
                    <div>
                      <button>编辑</button>
                      <button onClick={() => this.deleteExam(key)}>删除</button>
                      <button>查看数据</button>
                    </div>
                  </div>
                );
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    exam: state.exam,
    message: state.message,
    toggle: state.toggle
  };
};
const mapDispatchToProps = dispatch => ({
  setExamCheckedFunc: bindActionCreators(actions.setExamChecked, dispatch),
  changeExamStateFunc: bindActionCreators(actions.changeExamState, dispatch),
  geneExamFunc: bindActionCreators(actions.geneExam, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
