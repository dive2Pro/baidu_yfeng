import React, { Component } from 'react';
import Question from '../Question/index';
import { Input } from 'antd';
import { observer } from 'mobx-react';
@observer class TextQuestion extends Component {
  state = {};
  handleChange = event => {
    const value = event.target.value;
    const { isAnswerMode, thisQuestion } = this.props;
    isAnswerMode ? thisQuestion.updateContent(value) : this.setState({ temp_value: value });
  };

  render() {
    const {
      thisQuestion,
      isAnswerMode
    } = this.props;
    const content = thisQuestion.content;
    return (
      <div>
        <Input
          type="textarea"
          onChange={this.handleChange}
          value={isAnswerMode ? content : this.state.temp_value}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
