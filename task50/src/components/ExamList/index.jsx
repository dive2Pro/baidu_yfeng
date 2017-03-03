import React, { Component } from 'react';
import { connect } from 'react-redux';
class ExamList extends Component {
  render() {
    const { exam, toggle, message } = this.props;

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
            {Object.keys(exam).map((e, i) => {
              const {
                titleId,
                time,
                examState,
                id
              } = exam[e];
              const title = message[titleId];
              return (
                <div key={id} className="itemcontainer">
                  <div>
                    <input type="checkbox" />
                    {title}
                  </div>
                  <div>{time}</div>
                  <div>
                    {examState}
                  </div>
                  <div>
                    <button>编辑</button>
                    <button>删除</button>
                    <button>查看数据</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="listbottom">
            <input type="checkbox" id="all_check" />
            <label htmlFor="all_check">全选</label>
            <button>删除</button>
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
const mapDispatchToProps = dispatch => {};
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
