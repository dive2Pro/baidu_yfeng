import React, { Component } from 'react';
import { connect } from 'react-redux';
class ExamList extends Component {
  render() {
    // const { exam } = state.exam;

    return (
      <div className="examlist">
        <div className="itemcontainer">
          <div>标题</div>
          <div>时间</div>
          <div>状态</div>
          <div>操作</div>
        </div>
        <div>
          {}
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
