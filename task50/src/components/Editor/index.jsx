import React, { Component } from 'react';
import SingleChoice from '../SingleChoice/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as topicTypes from '../../constants/topicType';
import { ADD_QUESTION } from '../../constants/toggleTypes';
import classnames from 'classnames';
class Editor extends Component {
  componentDidUpdate() {
    console.log(this.addDiv.style);
    this.addDiv.addEventListener('transitionend', _ => {
      this.transform = '';
    });
  }
  render() {
    const { toggleFunc, toggle } = this.props;

    const itemsClazz = classnames('editor-addquestion-items', {
      active: toggle[ADD_QUESTION]
    });

    const addDivClazz = classnames('editor-addquestion-add', {
      active: toggle[ADD_QUESTION]
    });

    return (
      <div className="editor">
        <div className="editor-title" />
        <div className="editor-questions" />
        <div className="editor-addquestion">
          <div className={itemsClazz} ref={p => this.addItemsDiv = p}>
            {Object.keys(topicTypes.arr).map((type, index) => {
              return (
                <button key={index} onClick={() => toggleFunc(type)}>
                  {topicTypes.arr[type]}
                </button>
              );
            })}
          </div>
          <div
            ref={d => this.addDiv = d}
            className={addDivClazz}
            onClick={() => toggleFunc(ADD_QUESTION)}
          >
            {' '}＋　添加问题
          </div>
        </div>
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
const mapStateToProps = state => ({ toggle: state.toggle });
const mapDispatchToProps = dispatch => {
  return {
    toggleFunc: bindActionCreators(actions.toggle, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
