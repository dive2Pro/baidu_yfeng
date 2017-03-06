import React, { Component } from "react";
import Question from "../Question/index";

class TextQuestion extends Component {
  state = {};
  handleSubmit = () => {
    const { save, setDestory, thisQuestion } = this.props;
    const val = this.inp.value.trim();
    const { contentId } = thisQuestion;
    if (val) {
      save(contentId, val);
    } else {
      setDestory(contentId);
    }
  };

  handleChange = event => {
    this.setState({
      temp_value: event.target.value
    });
  };

  render() {
    const {
      thisQuestion,
      message,
      setEdit,
      editId
    } = this.props;

    const contentId = thisQuestion.contentId;
    const editing = editId === contentId;
    return (
      <div>
        <textarea
          rows="10"
          cols="80"
          onBlur={this.handleSubmit}
          onFocus={() => setEdit(contentId)}
          onChange={this.handleChange}
          value={editing ? this.state.temp_value : message[contentId]}
          ref={o => this.inp = o}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
