import React, { Component } from "react";
import Question from "../Question/index";
import { Input } from "antd";
class TextQuestion extends Component {
  state = {};
  handleChange = event => {
    const value = event.target.value;
    this.setState({
      temp_value: value
    });
    const { onHandleInput, thisQuestion } = this.props;
    onHandleInput({ id: thisQuestion.contentId, value });
  };

  render() {
    const {
      thisQuestion,
      message
    } = this.props;
    const contentId = thisQuestion.contentId;
    return (
      <div>
        <Input
          type="textarea"
          onChange={this.handleChange}
          value={this.state.temp_value || message[contentId]}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
