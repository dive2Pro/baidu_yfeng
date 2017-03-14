import React, { Component } from "react";
import Question from "../Question/index";
import { Input } from "antd";
class TextQuestion extends Component {
  state = {};
  handleChange = event => {
    const value = event.target.value;
    this.props.thisQuestion.updateContent(value)
  };

  render() {
    const {
      thisQuestion
    } = this.props;
    const content = thisQuestion.content;
    return (
      <div>
        <Input
          type="textarea"
          onChange={this.handleChange}
          value={this.state.temp_value || content}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
