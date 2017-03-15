import React, { Component } from "react";
import Question from "../Question/index";
import { Input } from "antd";
import {observer} from 'mobx-react'
@observer
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
          value={content}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
