import React, { Component } from 'react';
import SingleChoice from '../SingleChoice/index';
import { connect } from 'react-redux';
import actions from '../../actions/index';
class Editor extends Component {
  render() {
    return (
      <div className="editor">
        <div className="editor-title" />
        <div className="editor-addquestion" />
        <SingleChoice />
        <div className="editor-bottom">
          <div>
            <span>问卷截止日期</span>
            <input type="text" ref={r => this.selectDate = r} />
          </div>

          <div>
            <button>保存问卷</button>
            <button>发布问卷</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, actions)(Editor);
