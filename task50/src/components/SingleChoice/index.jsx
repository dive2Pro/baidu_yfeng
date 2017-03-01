import React, { Component, PropTypes } from 'react';
import InputItem from '../InputItem/index';
class SingleChoice extends Component {
  onToggle = () => {
    console.log('onToggle!');
  };
  save = () => {};
  render() {
    return (
      <div>
        <InputItem
          onToggle={this.onToggle}
          save={this.save}
          defStr="something"
          inputType="radio"
        />
      </div>
    );
  }
}

SingleChoice.propTypes = {
  id: PropTypes.string, //
  require: PropTypes.bool, //是否必填
  type: PropTypes.string,
  // 类型
  info: PropTypes.object //题目信息
};
export default SingleChoice;
