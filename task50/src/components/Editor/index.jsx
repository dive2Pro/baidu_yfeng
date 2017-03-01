import React, { Component } from 'react';
import SingleChoice from '../SingleChoice/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as topicTypes from '../../constants/topicType';
import { ADD_QUESTION, SELECT_DATE } from '../../constants/toggleTypes';
import classnames from 'classnames';
import Modal from '../Modal/index';
import DatePiker from '../../assets/multidatepiker';
class Editor extends Component {
  componentDidUpdate() {
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

    const topicArr = topicTypes.arr;

    return (
      <div className="editor">
        <div className="editor-title" />
        <div className="editor-questions">
          <SingleChoice />
        </div>
        <div className="editor-addquestion">
          <div className={itemsClazz} ref={p => this.addItemsDiv = p}>
            {Object.keys(topicArr).map((type, index) => {
              return (
                <button key={index} onClick={() => toggleFunc(type)}>
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
            {' '}＋　添加问题
          </div>
        </div>
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
const mapStateToProps = state => ({
  toggle: state.toggle
});
const mapDispatchToProps = dispatch => {
  return { toggleFunc: bindActionCreators(actions.toggle, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
